const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { Column, Entity, PrimaryColumn } from 'typeorm/browser'
import { iupdate } from '../../iupdate'
import { DbChange } from '../AppDatabase'
import { Record, createRecord } from '../Record'
import { getAccount, getDb, toAccount } from './DbResolver'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType } from './helpers'

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
export class Account implements Record<Account.Props> {
  @Column() _deleted: number
  @Column() _base?: any
  @Column() _history?: any

  @Field() @PrimaryColumn() id: string
  @Field() @Column() bankId: string

  @Field() @Column() name: string
  @Field() @Column() color: string
  @Field(type => AccountType) @Column() type: AccountType
  @Field() @Column() number: string
  @Field() @Column() visible: boolean
  @Field() @Column() routing: string
  @Field() @Column() key: string
}

@Resolver(objectType => Account)
export class AccountResolver {

  @Query(returns => Account)
  async account (
    @Arg('bankId') accountId: string,
    @Ctx() context: ResolverContext
  ): Promise<Account> {
    const db = getDb(context)
    const res = await getAccount(db, accountId)
    return toAccount(res)
  }

  @Mutation(returns => Account)
  async saveAccount (
    @Ctx() context: ResolverContext,
    @Arg('input') input: AccountInput,
    @Arg('accountId', { nullable: true }) accountId?: string,
    @Arg('bankId', { nullable: true }) bankId?: string,
  ): Promise<Account> {
    const db = getDb(context)
    const t = context.getTime()
    let account: Account.Interface
    let changes: Array<any>
    if (accountId) {
      const edit = await getAccount(db, accountId)
      const q = Account.diff(edit, input)
      changes = [
        Account.change.edit(t, accountId, q)
      ]
      account = iupdate(edit, q)
    } else {
      if (!bankId) {
        throw new Error('when creating an account, bankId must be specified')
      }
      const props: Account.Props = {
        ...Account.defaultValues,
        ...input
      }
      account = {
        bankId,
        ...createRecord(context.genId, props)
      }
      changes = [
        Account.change.add(t, account)
      ]
    }
    await db.change(changes)
    return toAccount(account)
  }

  @Mutation(returns => Boolean)
  async deleteAccount (
    @Arg('accountId') accountId: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const db = getDb(context)
    const t = context.getTime()
    const changes = [
      Account.change.remove(t, accountId)
    ]
    await db.change(changes)
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
  export const table = 'accounts'
  export const schema = Record.genSchema('bankId', '[bankId+_deleted]')

  export namespace change {
    export const add = (t: number, account: Interface): DbChange => ({
      table,
      t,
      adds: [account]
    })

    export const edit = (t: number, id: string, q: Query): DbChange => ({
      table,
      t,
      edits: [{ id, q }]
    })

    export const remove = (t: number, id: string): DbChange => ({
      table,
      t,
      deletes: [id]
    })
  }

  export const defaultValues: Props = {
    name: '',
    type: Type.CHECKING,
    color: generateColor(Type.CHECKING),
    number: '',
    visible: true,
    routing: '',
    key: ''
  }

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
