import cuid from 'cuid'
const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { Column, Entity, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Arg, Ctx, DbChange, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType, dbWrite, DbRecordEdit } from './helpers'
import { Bank } from './BankResolver'
import Axios, { CancelTokenSource } from 'axios'
import { createService, checkLogin, toAccountType } from '../../online'

// see ofx4js.domain.data.banking.AccountType
enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  MONEYMRKT = 'MONEYMRKT',
  CREDITLINE = 'CREDITLINE',
  CREDITCARD = 'CREDITCARD',
}
registerEnumType(AccountType, { name: 'AccountType' })

@InputType()
class AccountInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) color?: string
  @Field(type => AccountType, { nullable: true }) type?: AccountType
  @Field({ nullable: true }) number?: string
  @Field({ nullable: true }) visible?: boolean
  @Field({ nullable: true }) routing?: string
  @Field({ nullable: true }) key?: string
}

@ObjectType()
@Entity({ name: 'accounts' })
export class Account extends RecordClass<Account.Props> {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() bankId: string

  @Column() @Field() name: string
  @Column() @Field() color: string
  @Column() @Field(type => AccountType) @Column() type: AccountType
  @Column() @Field() number: string
  @Column() @Field() visible: boolean
  @Column() @Field() routing: string
  @Column() @Field() key: string

  constructor (bankId?: string, props?: AccountInput, genId?: () => string) {
    super()
    if (bankId && props && genId) {
      this.createRecord(genId, {
        ...Account.defaultValues(),
        ...props,
        bankId
      })
    }
  }
}

@Resolver(objectType => Account)
export class AccountResolver {
  private tokens = new Map<string, CancelTokenSource>()

  @Query(returns => Account)
  async account (
    @Ctx() { appDb }: ResolverContext,
    @Arg('accountId') accountId: string,
  ): Promise<Account> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.manager.createQueryBuilder(Account, 'account')
      .where('account._deleted = 0 AND account.id=:accountId', { accountId })
      .getOne()
    if (!res) {
      throw new Error('account not found')
    }
    return res
  }

  @Mutation(returns => Account)
  async saveAccount (
    @Ctx() { appDb }: ResolverContext,
    @Arg('input') input: AccountInput,
    @Arg('accountId', { nullable: true }) accountId?: string,
    @Arg('bankId', { nullable: true }) bankId?: string,
  ): Promise<Account> {
    if (!appDb) { throw new Error('appDb not open') }
    let account: Account
    let changes: Array<any>
    const t = Date.now()
    if (accountId) {
      account = await appDb.manager.findOneOrFail(Account, accountId)
      const q = Account.diff(account, input)
      changes = [
        Account.change.edit(t, accountId, q)
      ]
      account.update(q)
    } else {
      if (!bankId) {
        throw new Error('when creating an account, bankId must be specified')
      }
      account = new Account(bankId, input, cuid)
      changes = [
        Account.change.add(t, account)
      ]
    }
    await dbWrite(appDb, changes)
    return account
  }

  @Mutation(returns => Boolean)
  async deleteAccount (
    @Ctx() { appDb }: ResolverContext,
    @Arg('accountId') accountId: string,
  ): Promise<Boolean> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = Date.now()
    const changes = [
      Account.change.remove(t, accountId)
    ]
    await dbWrite(appDb, changes)
    return true
  }

  @Mutation(returns => Bank)
  async getAccountList (
    @Ctx() { appDb, formatMessage }: ResolverContext,
    @Arg('bankId') bankId: string,
    @Arg('cancelToken') cancelToken: string,
  ): Promise<Bank> {
    if (!appDb) { throw new Error('appDb not open') }

    const bank = await appDb.manager.findOneOrFail(Bank, bankId)
    if (!bank.online) {
      throw new Error(`getAccountList: bank is not set online`)
    }

    const existingAccounts = await appDb.createQueryBuilder(Account, 'account')
      .where('account._deleted = 0 AND account.bankId=:bankId', { bankId: bank.id })
      .getMany()

    const source = Axios.CancelToken.source()
    this.tokens.set(cancelToken, source)

    try {
      const service = createService(bank, source.token, formatMessage)
      const { username, password } = checkLogin(bank, formatMessage)
      const accountProfiles = await service.readAccountProfiles(username, password)
      if (accountProfiles.length === 0) {
        console.log('server reports no accounts')
      } else {
        console.log('accountProfiles', accountProfiles)
        const t = Date.now()
        const accounts = accountProfiles
          .map(accountProfile => toAccountInput(bank, accountProfiles, accountProfile))
          .filter((input): input is Account => input !== undefined)

        const newAccounts = accounts
          .filter(account =>
            !existingAccounts.find(acct =>
              accountsEqual(account, acct)
            )
          )
          .map(input => new Account(bankId, input, cuid))

        const changedAccounts = accounts
          .map(account => {
            const existingAccount = existingAccounts.find(acct =>
              accountsEqual(account, acct)
            )
            if (existingAccount) {
              return { id: existingAccount.id, q: Account.diff(existingAccount, account) }
            } else {
              return undefined
            }
          })
          .filter((change): change is DbRecordEdit => !!change)
          .filter(change => Object.keys(change.q).length > 0)

        if (newAccounts.length || changedAccounts.length) {
          const change: DbChange = {
            table: Account,
            t,
            adds: newAccounts,
            edits: changedAccounts
          }
          console.log('account changes', change)
          await dbWrite(appDb, [change])
        } else {
          console.log('no account changes')
        }
      }
    } catch (ex) {
      if (!source.token.reason) {
        throw ex
      }
    } finally {
      this.tokens.delete(cancelToken)
    }

    return bank
  }

  @Mutation(returns => Bank)
  async getTransactions (
    @Ctx() { appDb, formatMessage }: ResolverContext,
    @Arg('bankId') bankId: string,
    @Arg('accountId') accountId: string,
    @Arg('start') start: Date,
    @Arg('end') end: Date,
    @Arg('cancelToken') cancelToken: string,
  ): Promise<Account> {
    if (!appDb) { throw new Error('appDb not open') }

    const bank = await appDb.manager.findOneOrFail(Bank, bankId)
    if (!bank.online) {
      throw new Error(`getAccountList: bank is not set online`)
    }

    const account = await appDb.manager.findOneOrFail(Account, accountId)

    // const existingAccounts = await appDb.createQueryBuilder(Account, 'account')
    //   .where('account._deleted = 0 AND account.bankId=:bankId', { bankId: bank.id })
    //   .getMany()

    // const source = Axios.CancelToken.source()
    // this.tokens.set(cancelToken, source)

    // try {
    //   const service = createService(bank, source.token, formatMessage)
    //   const { username, password } = checkLogin(bank, formatMessage)
    //   const accountProfiles = await service.readAccountProfiles(username, password)
    //   if (accountProfiles.length === 0) {
    //     console.log('server reports no accounts')
    //   } else {
    //     console.log('accountProfiles', accountProfiles)
    //     const t = Date.now()
    //     const accounts = accountProfiles
    //       .map(accountProfile => toAccountInput(bank, accountProfiles, accountProfile))
    //       .filter((input): input is Account => input !== undefined)

    //     const newAccounts = accounts
    //       .filter(account =>
    //         !existingAccounts.find(acct =>
    //           accountsEqual(account, acct)
    //         )
    //       )
    //       .map(input => new Account(bankId, input, cuid))

    //     const changedAccounts = accounts
    //       .map(account => {
    //         const existingAccount = existingAccounts.find(acct =>
    //           accountsEqual(account, acct)
    //         )
    //         if (existingAccount) {
    //           return { id: existingAccount.id, q: Account.diff(existingAccount, account) }
    //         } else {
    //           return undefined
    //         }
    //       })
    //       .filter((change): change is DbRecordEdit => !!change)
    //       .filter(change => Object.keys(change.q).length > 0)

    //     if (newAccounts.length || changedAccounts.length) {
    //       const change: DbChange = {
    //         table: Account,
    //         t,
    //         adds: newAccounts,
    //         edits: changedAccounts
    //       }
    //       console.log('account changes', change)
    //       await dbWrite(appDb, [change])
    //     } else {
    //       console.log('no account changes')
    //     }
    //   }
    // } catch (ex) {
    //   if (!source.token.reason) {
    //     throw ex
    //   }
    // } finally {
    //   this.tokens.delete(cancelToken)
    // }

    return account
  }

  @Mutation(returns => Boolean)
  async cancel (
    @Arg('cancelToken') cancelToken: string,
  ): Promise<boolean> {
    const source = this.tokens.get(cancelToken)
    if (!source) {
      return false
    }

    source.cancel('cancelled')
    return true
  }
}

const accountsEqual = (a: AccountInput, b: AccountInput): boolean => {
  return (a.type === b.type && a.number === b.number)
}

const toAccountInput = (
  bank: Bank,
  accountProfiles: ofx4js.domain.data.signup.AccountProfile[],
  accountProfile: ofx4js.domain.data.signup.AccountProfile
): AccountInput | undefined => {
  const name = accountProfile.getDescription()
    || (accountProfiles.length === 1 ? bank.name : `${bank.name} ${accountProfiles.indexOf(accountProfile)}`)

  if (accountProfile.getBankSpecifics()) {
    const bankSpecifics = accountProfile.getBankSpecifics()
    const bankAccount = bankSpecifics.getBankAccount()
    // bankAccount.getBranchId()
    return {
      name,
      routing: bankAccount.getBankId(),
      type: toAccountType(bankAccount.getAccountType()),
      number: bankAccount.getAccountNumber(),
    }
  } else if (accountProfile.getCreditCardSpecifics()) {
    const creditCardSpecifics = accountProfile.getCreditCardSpecifics()
    const creditCardAccount = creditCardSpecifics.getCreditCardAccount()
    return {
      name,
      type: AccountType.CREDITCARD,
      number: creditCardAccount.getAccountNumber(),
      key: creditCardAccount.getAccountKey() || '',
    }
  } else if (accountProfile.getInvestmentSpecifics()) {
    // TODO: support investment accounts
    console.log('unsupported account: investment')
  } else {
    console.log('unsupported account: ???')
  }
  return undefined
}

export namespace Account {
  export interface Props extends Pick<AccountInput, keyof AccountInput> { }
  export interface Interface extends Pick<Account, Exclude<keyof Account, 'saveAccount'>> { }
  export const Type = AccountType
  export type Type = AccountType

  export const messages = defineMessages({
    CHECKING: {
      id: 'Account.Type.CHECKING',
      defaultMessage: 'Checking'
    },
    SAVINGS: {
      id: 'Account.Type.SAVINGS',
      defaultMessage: 'Savings'
    },
    MONEYMRKT: {
      id: 'Account.Type.MONEYMRKT',
      defaultMessage: 'Money Market'
    },
    CREDITLINE: {
      id: 'Account.Type.CREDITLINE',
      defaultMessage: 'Credit Line'
    },
    CREDITCARD: {
      id: 'Account.Type.CREDITCARD',
      defaultMessage: 'Credit Card'
    }
  })

  export const generateColor = (type?: Type): string => {
    switch (type) {
      case Type.CHECKING:
        return randomColor({ hue: 'red', luminosity: 'bright' })
      case Type.SAVINGS:
        return randomColor({ hue: 'green', luminosity: 'bright' })
      case Type.MONEYMRKT:
        return randomColor({ hue: 'purple', luminosity: 'bright' })
      case Type.CREDITLINE:
        return randomColor({ hue: 'blue', luminosity: 'bright' })
      case Type.CREDITCARD:
        return randomColor({ hue: 'orange', luminosity: 'bright' })

      default:
        return randomColor({ luminosity: 'bright' })
    }
  }

  export type Query = iupdate.Query<AccountInput>

  export namespace change {
    export const add = (t: number, ...accounts: Interface[]): DbChange => ({
      table: Account,
      t,
      adds: accounts
    })

    export const edit = (t: number, id: string, q: Query): DbChange => ({
      table: Account,
      t,
      edits: [{ id, q }]
    })

    export const remove = (t: number, id: string): DbChange => ({
      table: Account,
      t,
      deletes: [id]
    })
  }

  export const defaultValues = (): Props => ({
    name: '',
    type: Type.CHECKING,
    color: generateColor(Type.CHECKING),
    number: '',
    visible: true,
    routing: '',
    key: ''
  })

  type Nullable<T> = { [K in keyof T]?: T[K] | undefined | null }

  export const diff = (account: Account, values: Nullable<Props>): Query => {
    return Object.keys(values).reduce(
      (q, prop): Query => {
        const val = values[prop]
        if (val !== account[prop]) {
          return ({
            ...q,
            [prop]: { $set: val }
          })
        } else {
          return q
        }
      },
      {} as Query
    )
  }
}
