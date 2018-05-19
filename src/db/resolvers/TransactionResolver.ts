import { iupdate } from '../../iupdate'
import { Record } from '../Record'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, ResolverContext, registerEnumType } from './helpers'

export interface Split {
  [categoryId: string]: number
}

@InputType()
class TransactionInput {
  @Field({ nullable: true }) account?: string
  @Field({ nullable: true }) serverid?: string
  @Field({ nullable: true }) time?: number
  @Field({ nullable: true }) type?: string
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) memo?: string
  @Field({ nullable: true }) amount?: number
  split: Split
}

@ObjectType()
export class Transaction implements Record<Transaction.Props> {
  _deleted: number
  _base?: any
  _history?: any

  @Field() id: string
  @Field() account: string
  @Field() serverid: string
  @Field() time: number
  @Field() type: string
  @Field() name: string
  @Field() memo: string
  @Field() amount: number
  split: Split
}

@Resolver(objectType => Transaction)
export class TransactionResolver {
}

export namespace Transaction {
  export interface Props extends Pick<TransactionInput, keyof TransactionInput> { }
  export type Query = iupdate.Query<Props>
  export const table = 'transactions'
  export const schema = Record.genSchema('account', 'time')
}
