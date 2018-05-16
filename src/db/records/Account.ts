const randomColor = require<(options?: RandomColorOptions) => string>('randomcolor')
import { defineMessages } from 'react-intl'
import { iupdate } from '../../iupdate'
import { DbChange } from '../AppDatabase'
import { Record } from '../Record'

import { Entity, Column, PrimaryColumn, Connection, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Input, makeSchema, Type, Field, ID, String, Mutation } from 'graphql-typescript'
import { ResolverContext } from '../AppDbProvider'

export interface Account extends Account.Props, Record<Account.Props> {
  readonly bankId: string
}

@Input class AccountInput {
  @Field readonly name?: String
  @Field readonly color?: String
  @Field readonly type?: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  @Field readonly number?: String
  @Field readonly visible?: Boolean
  @Field readonly routing?: String
  @Field readonly key?: String
}

type Foo = { [k in keyof AccountInput]-?: AccountInput[k] }
interface X extends Foo { }

@Type @Entity({ name: 'accounts' })
export class Account2 {
  @Field @PrimaryColumn() id: ID

  @Field @Column() name: String
  @Field @Column({ default: 'red' }) color: String
  @Field @Column({ default: 'CHECKING' }) type: 'CHECKING' | 'SAVINGS' | 'MONEYMRKT' | 'CREDITLINE' | 'CREDITCARD'
  @Field @Column() number: String
  @Field @Column({ default: true }) visible: Boolean
  @Field @Column({ default: '' }) routing: String
  @Field @Column({ default: '' }) key: String

  @Mutation(Account2)
  static async create (_: any, args: AccountInput, context: Connection) {
    if (!args.name) {
      throw new Error('name is required')
    }
    const repo = context.getRepository(Account2)
    const account = await repo.save({ ...args, id: Math.random().toString() }) as Account2
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

  export interface Props {
    readonly name: string
    readonly color: string
    readonly type: Type
    readonly number: string
    readonly visible: boolean
    readonly routing: string
    readonly key: string
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

  export type Query = iupdate.Query<Props>
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
