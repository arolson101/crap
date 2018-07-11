import cuid from 'cuid'
const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { Column, Entity, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Arg, Ctx, DbChange, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType, dbWrite } from './helpers'

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
    export const add = (t: number, account: Interface): DbChange => ({
      table: Account,
      t,
      adds: [account]
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
