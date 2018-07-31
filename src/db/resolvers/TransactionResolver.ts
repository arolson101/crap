import cuid from 'cuid'
import { Transaction, TransactionInput } from '../entities/index'
import { Arg, Ctx, DbChange, dbWrite, Mutation, Query, Resolver } from './helpers'
import { AppDbService } from '../services/AppDbService'

@Resolver(Transaction)
export class TransactionResolver {
  constructor(
    private app: AppDbService
  ) {}

  @Query(returns => Transaction)
  async transaction(
    @Arg('transactionId') transactionId: string,
  ): Promise<Transaction> {
    return this.app.transactions.get(transactionId)
  }

  @Mutation(returns => Transaction)
  async saveTransaction(
    @Arg('input') input: TransactionInput,
    @Arg('transactionId', { nullable: true }) transactionId: string,
    @Arg('accountId', { nullable: true }) accountId?: string,
  ): Promise<Transaction> {
    const t = Date.now()
    const table = Transaction
    let transaction: Transaction
    let changes: DbChange[]
    if (transactionId) {
      transaction = await this.app.transactions.get(transactionId)
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
    await this.app.write(changes)
    return transaction
  }

  @Mutation(returns => Transaction)
  async deleteTransaction(
    @Arg('transactionId') transactionId: string,
  ): Promise<Transaction> {
    const t = Date.now()
    const table = Transaction
    const transaction = await this.app.transactions.get(transactionId)
    const changes: DbChange[] = [
      { table, t, deletes: [transactionId] }
    ]
    await this.app.write(changes)
    return transaction
  }
}
