import { getConnectionManager, Connection, getConnection } from 'typeorm/browser'
import { Account } from './AccountResolver'
import { Bank } from './BankResolver'
import { Arg, Ctx, Mutation, Query, Resolver, ResolverContext } from './helpers'
import { entities } from '../entities'
import { DbInfo } from './DbInfo'

@Resolver()
export class DbResolver {

  @Query(returns => [String])
  async allDbs (@Ctx() context: ResolverContext): Promise<string[]> {
    const allDb = await context.getAllDb()
    const dbs = await allDb.manager.createQueryBuilder(DbInfo, 'db').getMany()
    return dbs.map(db => db.dbName)
  }

  @Mutation(returns => Boolean)
  async openDb (
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const db = await context.openDb(entities, 'appdb', password)
    context.setAppDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async closeDb (
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    context.setAppDb(undefined)
    return true
  }
}
