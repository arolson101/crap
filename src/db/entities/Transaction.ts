import { iupdate } from '../../iupdate'
import { standardizeDate } from '../../util/date'
import { RecordClass } from '../Record'
import { Column, Entity, PrimaryColumn } from '../typeorm'
import { Field, InputType, ObjectType } from './helpers'

export interface Split {
  [categoryId: string]: number
}

@InputType()
export class TransactionInput {
  @Field({ nullable: true }) account?: string
  @Field({ nullable: true }) serverid?: string
  @Field({ nullable: true }) time?: Date
  @Field({ nullable: true }) type?: string
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) memo?: string
  @Field({ nullable: true }) amount?: number
  // split: Split
}

@ObjectType()
@Entity({ name: 'transactions' })
export class Transaction extends RecordClass<Transaction> implements Transaction.Props {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() accountId: string

  @Column() @Field() time: Date
  @Column() @Field() account: string
  @Column() @Field() serverid: string
  @Column() @Field() type: string
  @Column() @Field() name: string
  @Column() @Field() memo: string
  @Column() @Field() amount: number
  @Column({ default: 0 }) @Field() balance: number
  // split: Split

  constructor(accountId?: string, props?: TransactionInput, genId?: () => string) {
    super()
    if (accountId && props && genId) {
      this.createRecord(genId, {
        ...Transaction.defaultValues,
        ...props,
        // balance: props.amount,
        accountId
      })
    }
  }
}

export namespace Transaction {
  export interface Props extends Pick<TransactionInput, keyof TransactionInput> { }
  export type Query = iupdate.Query<Props>

  export const defaultValues = () => ({
    account: '',
    serverid: '',
    time: standardizeDate(new Date()),
    type: '',
    name: '',
    memo: '',
    amount: 0,
  })

  // TODO: move this to untility
  type Nullable<T> = { [K in keyof T]?: T[K] | undefined | null }

  export const diff = (tx: Transaction, values: Nullable<Props>): Query => {
    return Object.keys(values).reduce(
      (q, prop): Query => {
        const val = values[prop]
        if (val !== tx[prop]) {
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
