const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { Column, Connection, Entity, PrimaryColumn } from 'typeorm'
import { Boolean, Field, Input, Mutation, Nullable, String, Type } from './helpers'
import { iupdate } from '../../iupdate'
import { DbChange } from '../AppDatabase'
import { Record } from '../Record'

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

@Type @Entity({ name: 'accounts' })
export class Account implements Record<Account> {
  @Column() _deleted: number
  @Column() _base: any
  @Column() _history: any

  @Field @PrimaryColumn() id: string
  @Field @Column() bankId: String

  @Field @Column() name: String
  @Field @Column({ default: 'red' }) color: String
  @Field @Column({ default: 'CHECKING' }) type: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  @Field @Column() number: String
  @Field @Column({ default: true }) visible: Boolean
  @Field @Column({ default: '' }) routing: String
  @Field @Column({ default: '' }) key: String

  @Mutation(Account)
  static async createAccount (_: any, args: CreateAccountArgs, context: Connection) {
    if (!args.inputs.name) {
      throw new Error('name is required')
    }
    const repo = context.getRepository(Account)
    const account = await repo.save({
      _deleted: 0,
      ...args.inputs,
      bankId: args.bankId,
      id: Math.random().toString()
    })
    return account
  }
}

export namespace Account {
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
    export const add = (t: number, account: Account): DbChange => ({
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

  // export const defaultValues: Props = {
  //   name: '',
  //   type: Type.CHECKING,
  //   color: generateColor(Type.CHECKING),
  //   number: '',
  //   visible: true,
  //   routing: '',
  //   key: ''
  // }

  // type Nullable<T> = { [K in keyof T]?: T[K] | undefined | null }

  // export const diff = (account: Account, values: Nullable<Props>): Query => {
  //   return Object.keys(values).reduce(
  //     (q, prop): Query => {
  //       const val = values[prop]
  //       if (val !== account[prop]) {
  //         return ({
  //           ...q,
  //           [prop]: { $set: val }
  //         })
  //       } else {
  //         return q
  //       }
  //     },
  //     {} as Query
  //   )
  // }
}
