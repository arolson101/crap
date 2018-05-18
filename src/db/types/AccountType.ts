const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { Column, Connection, Entity, PrimaryColumn } from 'typeorm'
import { Boolean, Field, Input, Mutation, Nullable, ResolverContext, String, Type } from './helpers'
import { getDb, getBank, toBank, getAccount, toAccount } from './DbType'
import { iupdate } from '../../iupdate'
import { DbChange } from '../AppDatabase'
import { createRecord, Record } from '../Record'

@Input export class AccountInput {
  @Nullable @Field name?: String
  @Nullable @Field color?: String
  @Nullable @Field type?: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  @Nullable @Field number?: String
  @Nullable @Field visible?: Boolean
  @Nullable @Field routing?: String
  @Nullable @Field key?: String
}

class CreateAccountArgs {
  @Field bankId: String
  @Field inputs: AccountInput
}

class SaveAccountArgs {
  @Nullable @Field accountId: string
  @Nullable @Field bankId: string
  @Field input: AccountInput
}

class DeleteAccountArgs {
  @Field accountId: string
}

@Type @Entity({ name: 'accounts' })
export class Account implements Record<Account.Props> {
  @Column() _deleted: number
  @Column() _base: any
  @Column() _history: any

  @Field @PrimaryColumn() id: string
  @Field @Column() bankId: string

  @Field @Column() name: string
  @Field @Column() color: string
  @Field @Column() type: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  @Field @Column() number: string
  @Field @Column() visible: Boolean
  @Field @Column() routing: string
  @Field @Column() key: string

  @Mutation(Account) async saveAccount (_: any, args: SaveAccountArgs, context: ResolverContext) {
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

  @Mutation(Boolean) async deleteAccount (_: any, args: DeleteAccountArgs, context: ResolverContext) {
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
