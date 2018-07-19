import { Column, Entity, Index, PrimaryColumn } from '../typeorm'
import { iupdate } from '../../iupdate'
import { Record, RecordClass } from '../Record'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query,
  Resolver, ResolverContext, registerEnumType, FieldResolver } from './helpers'

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
  // split: Split
}

@ObjectType()
@Entity({ name: 'transactions' })
export class Transaction extends RecordClass<Transaction> implements Transaction.Props {
  @PrimaryColumn() @Field() id: string
  @Column() @Field() accountId: string

  @Column() @Field() time: number
  @Column() @Field() account: string
  @Column() @Field() serverid: string
  @Column() @Field() type: string
  @Column() @Field() name: string
  @Column() @Field() memo: string
  @Column() @Field() amount: number
  // split: Split
}

@Resolver(Transaction)
export class TransactionResolver {

  @Query(returns => Transaction)
  async transaction (
    @Ctx() { appDb }: ResolverContext,
    @Arg('transactionId') transactionId: string,
  ): Promise<Transaction> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.manager.createQueryBuilder(Transaction, 'tx')
      .where({ _deleted: 0, id: transactionId })
      .getOne()
    if (!res) {
      throw new Error('transaction not found')
    }
    return res
  }
}

export namespace Transaction {
  export interface Props extends Pick<TransactionInput, keyof TransactionInput> { }
  export type Query = iupdate.Query<Props>
}
