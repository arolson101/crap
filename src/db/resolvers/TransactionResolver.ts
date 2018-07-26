import cuid from 'cuid'
import { Transaction, TransactionInput } from '../entities/index'
import { Arg, Ctx, DbChange, dbWrite, Mutation, Query, Resolver, ResolverContext } from './helpers'

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
