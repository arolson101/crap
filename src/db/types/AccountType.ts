const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { Column, Connection, Entity, PrimaryColumn } from 'typeorm'
import { Arg, Args, ArgsType, Ctx, InputType, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, ResolverContext, ResolverInterface, Root } from './helpers'
import { getDb, getBank, toBank, getAccount, toAccount } from './DbType'
import { iupdate } from '../../iupdate'
import { DbChange } from '../AppDatabase'
import { createRecord, Record } from '../Record'

@InputType()
class AccountInput {
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) color?: string
  @Field({ nullable: true }) type?: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  @Field({ nullable: true }) number?: string
  @Field({ nullable: true }) visible?: boolean
  @Field({ nullable: true }) routing?: string
  @Field({ nullable: true }) key?: string
}

@ArgsType()
class CreateAccountArgs {
  @Field() bankId: string
  @Field() inputs: AccountInput
}

@ArgsType()
class SaveAccountArgs {
  @Field({ nullable: true }) accountId: string
  @Field({ nullable: true }) bankId: string
  @Field() input: AccountInput
}

@ArgsType()
class DeleteAccountArgs {
  @Field() accountId: string
}

@ObjectType()
@Entity({ name: 'accounts' })
export class Account implements Record<Account.Props> {
  @Column() _deleted: number
  @Column() _base: any
  @Column() _history: any

  @Field() @PrimaryColumn() id: string
  @Field() @Column() bankId: string

  @Field() @Column() name: string
  @Field() @Column() color: string
  @Field() @Column() type: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
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
    @Args() args: SaveAccountArgs,
    @Ctx() context: ResolverContext
  ): Promise<Account> {
    const db = getDb(context)
    const t = context.getTime()
    let account: Account.Interface
    let changes: Array<any>
    if (args.accountId) {
      const edit = await getAccount(db, args.accountId)
      const q = Account.diff(edit, args.input)
      changes = [
        Account.change.edit(t, args.accountId, q)
      ]
      account = iupdate(edit, q)
    } else {
      if (!args.bankId) {
        throw new Error('when creating an account, bankId must be specified')
      }
      const props: Account.Props = {
        ...Account.defaultValues,
        ...args.input
      }
      account = {
        bankId: args.bankId,
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
    @Args() args: DeleteAccountArgs,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const db = getDb(context)
    const t = context.getTime()
    const changes = [
      Account.change.remove(t, args.accountId)
    ]
    await db.change(changes)
    return true
  }
}

export namespace Account {
  export interface Props extends Pick<AccountInput, keyof AccountInput> {}
  export interface Interface extends Pick<Account, Exclude<keyof Account, 'saveAccount'>> {}

  // see ofx4js.domain.data.banking.AccountType
  export type Type = 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  export const Type = {
    CHECKING: 'CHECKING' as Type,
    SAVINGS: 'SAVINGS' as Type,
    MONEYMRKT: 'MONEYMRKT' as Type,
    CREDITLINE: 'CREDITLINE' as Type,
    CREDITCARD: 'CREDITCARD' as Type
  }

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
