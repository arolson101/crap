import { Column, Entity, Index, PrimaryColumn } from 'typeorm/browser'
import { iupdate } from '../../iupdate'
import { Record, RecordClass } from '../Record'
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
@Entity({ name: 'transactions' })
export class Transaction extends RecordClass<Transaction.Props> {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() account: string
  @Column() @Field() serverid: string
  @Column() @Field() time: number
  @Column() @Field() type: string
  @Column() @Field() name: string
  @Column() @Field() memo: string
  @Column() @Field() amount: number
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
