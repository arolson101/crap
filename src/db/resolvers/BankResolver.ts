import cuid from 'cuid'
import { Account, Bank, BankInput } from '../entities/index'
import { Arg, Ctx, dbWrite, FieldResolver, Mutation, Query, Resolver, ResolverContext, Root } from './helpers'

@Resolver(Bank)
export class BankResolver {

  @Query(returns => Bank)
  async bank(
    @Ctx() { appDb }: ResolverContext,
    @Arg('bankId') bankId: string,
  ): Promise<Bank> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.manager.createQueryBuilder(Bank, 'bank')
      .where({ _deleted: 0, id: bankId })
      .getOne()
    if (!res) {
      throw new Error('account not found')
    }
    return res
  }

  @Query(returns => [Bank])
  async banks(@Ctx() { appDb }: ResolverContext): Promise<Bank[]> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.createQueryBuilder(Bank, 'bank')
      .where({ _deleted: 0 })
      .getMany()
    return res
  }

  @FieldResolver(type => [Account])
  async accounts(
    @Ctx() { appDb }: ResolverContext,
    @Root() bank: Bank,
  ): Promise<Account[]> {
    if (!appDb) { throw new Error('appDb not open') }
    const res = await appDb.createQueryBuilder(Account, 'account')
      .where({ _deleted: 0, bankId: bank.id }) // 'tx._deleted = 0 AND tx.bankId=:bankId', { bankId: bank.id })
      .orderBy({ name: 'ASC' })
      .getMany()
    return res
  }

  @Mutation(returns => Bank)
  async saveBank(
    @Ctx() { appDb }: ResolverContext,
    @Arg('input') input: BankInput,
    @Arg('bankId', { nullable: true }) bankId?: string,
  ): Promise<Bank> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = Date.now()
    let bank: Bank
    let changes: Array<any>
    if (bankId) {
      bank = await appDb.manager.findOneOrFail(Bank, bankId)
      const q = Bank.diff(bank, input)
      changes = [
        Bank.change.edit(t, bankId, q)
      ]
      bank.update(q)
    } else {
      bank = new Bank(input, cuid)
      changes = [
        Bank.change.add(t, bank)
      ]
    }
    await dbWrite(appDb, changes)
    return bank
  }

  @Mutation(returns => Boolean)
  async deleteBank(
    @Ctx() { appDb }: ResolverContext,
    @Arg('bankId') bankId: string,
  ): Promise<Boolean> {
    if (!appDb) { throw new Error('appDb not open') }
    const t = Date.now()
    const changes = [
      Bank.change.remove(t, bankId)
    ]
    await dbWrite(appDb, changes)
    return true
  }
}
