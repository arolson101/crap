import * as crypto from 'crypto'
import sanitize from 'sanitize-filename'
import { DbInfo } from '../entities/index'
import { deleteDb, openDb } from '../openDb'
import { Arg, Ctx, Mutation, Query, Resolver, ResolverContext } from './helpers'

@Resolver(objectType => DbInfo)
export class DbResolver {

  @Query(returns => [DbInfo])
  async allDbs(@Ctx() { indexDb }: ResolverContext): Promise<DbInfo[]> {
    const dbs = await indexDb.getRepository(DbInfo)
      .find()
    return dbs
  }

  @Mutation(returns => Boolean)
  async createDb(
    @Arg('name') name: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() { indexDb, setAppDb }: ResolverContext
  ): Promise<Boolean> {
    const dbInfo = new DbInfo()
    dbInfo.dbId = crypto.randomBytes(8).toString('base64')
    dbInfo.name = name
    dbInfo.path = sanitize(name)
    const key = DbInfo.generateKey()
    dbInfo.setPassword(key, password)

    const db = await openDb(true, dbInfo.path, key)
    await indexDb.manager.save(DbInfo, dbInfo)
    setAppDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async openDb(
    @Arg('dbId') dbId: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() { indexDb, setAppDb }: ResolverContext
  ): Promise<Boolean> {
    const dbInfo = await indexDb.getRepository(DbInfo).findOneOrFail(dbId)
    const key = dbInfo.getKey(password)
    const db = await openDb(true, dbInfo.path, key)
    setAppDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async closeDb(
    @Ctx() { setAppDb }: ResolverContext
  ): Promise<Boolean> {
    setAppDb(null)
    return true
  }

  @Mutation(returns => Boolean)
  async deleteDb(
    @Arg('dbId') dbId: string,
    @Ctx() { indexDb }: ResolverContext
  ): Promise<Boolean> {
    const dbInfo = await indexDb.getRepository(DbInfo).findOneOrFail(dbId)
    await deleteDb(dbInfo.path)
    await indexDb.createQueryBuilder()
      .delete()
      .from(DbInfo)
      .where('dbId = :dbId', { dbId })
      .execute()
    return true
  }
}
