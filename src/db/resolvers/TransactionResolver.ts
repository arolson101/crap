import cuid from 'cuid'
import { iupdate } from '../../iupdate'
import { RecordClass } from '../Record'
import { Column, Entity, PrimaryColumn } from '../typeorm'
import { Arg, Ctx, Field, InputType, ObjectType, Mutation, Query, Resolver, ResolverContext, dbWrite, DbChange } from './helpers'

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

@Resolver(Transaction)
export class TransactionResolver {

  @Query(returns => Transaction)
  async transaction(
    @Ctx() { appDb }: ResolverContext,
    @Arg('transactionId') transactionId: string,
  ): Promise<Transaction> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.manager.createQueryBuilder(Transaction, 'tx')
      .where({ _deleted: 0, id: transactionId }) // TODO: make this safe
      .getOne()
    if (!res) {
      throw new Error('transaction not found')
    }
    return res
  }

  @Mutation(returns => Transaction)
  async saveTransaction(
    @Ctx() { appDb }: ResolverContext,
    @Arg('input') input: TransactionInput,
    @Arg('transactionId', { nullable: true }) transactionId: string,
    @Arg('accountId', { nullable: true }) accountId?: string,
  ): Promise<Transaction> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = Date.now()
    const table = Transaction
    let transaction: Transaction
    let changes: DbChange[]
    if (transactionId) {
      transaction = await appDb.manager.findOneOrFail(Transaction, transactionId)
      const q = Transaction.diff(transaction, input)
      changes = [
        { table, t, edits: [{ id: transactionId, q }] }
      ]
      transaction.update(q)
    } else {
      if (!accountId) {
        throw new Error('when creating an transaction, accountId must be specified')
      }
      transaction = new Transaction(accountId, input, cuid)
      changes = [
        { table, t, adds: [transaction] }
      ]
    }
    await dbWrite(appDb, changes)
    return transaction
  }

  @Mutation(returns => Transaction)
  async deleteTransaction(
    @Ctx() { appDb }: ResolverContext,
    @Arg('transactionId') transactionId: string,
  ): Promise<Transaction> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = Date.now()
    const table = Transaction
    const transaction = await appDb.manager.findOneOrFail(Transaction, transactionId)
    const changes: DbChange[] = [
      { table, t, deletes: [transactionId] }
    ]
    await dbWrite(appDb, changes)
    return transaction
  }
}

export namespace Transaction {
  export interface Props extends Pick<TransactionInput, keyof TransactionInput> { }
  export type Query = iupdate.Query<Props>

  export const defaultValues = {
    account: '',
    serverid: '',
    time: 0,
    type: '',
    name: '',
    memo: '',
    amount: 0,
  }

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
