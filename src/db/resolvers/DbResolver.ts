import { getConnectionManager, Connection, getConnection } from 'typeorm/browser'
import { Account } from './AccountResolver'
import { Bank } from './BankResolver'
import { Arg, Ctx, Mutation, Query, Resolver, ResolverContext } from './helpers'

@Resolver()
export class DbResolver {

  @Query(returns => [String])
  async allDbs (@Ctx() context: ResolverContext): Promise<string[]> {
    // hack
    return ['']
  }

  @Mutation(returns => Boolean)
  async openDb (
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const db = await context.openDb('appdb', password)
    context.setDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async closeDb (
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    context.setDb(undefined)
    return true
  }
}

export const getDb = (context: ResolverContext) => {
  const db = context.db
  if (!db) {
    throw new Error('db not open')
  }
  return db
}

export const getBank = async (db: Connection, id: string): Promise<Bank> => {
  const bank = db.manager.findOneOrFail(Bank, id)
  return bank
}

export const getAccount = async (db: Connection, id: string): Promise<Account> => {
  const account = await db.manager.findOneOrFail(Account, id)
  return account
}
