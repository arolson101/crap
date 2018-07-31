import * as crypto from 'crypto'
import sanitize from 'sanitize-filename'
import { DbInfo } from '../entities/index'
import { deleteDb, openDb } from '../openDb'
import { Arg, Ctx, Mutation, Query, Resolver, ResolverContext } from './helpers'
import { Service, Container } from 'typedi'
import { DbService } from '../../redux/reducers/dbReducer'

@Service()
@Resolver(objectType => DbInfo)
export class DbResolver {
  constructor(
    private dbs: DbService = Container.get(DbService)
  ) { }

  @Query(returns => [DbInfo])
  async allDbs(): Promise<DbInfo[]> {
    const dbs = await this.dbs.indexDb.getRepository(DbInfo)
      .find()
    return dbs
  }

  @Mutation(returns => Boolean)
  async createDb(
    @Arg('name') name: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
  ): Promise<Boolean> {
    const dbInfo = new DbInfo()
    dbInfo.dbId = crypto.randomBytes(8).toString('base64')
    dbInfo.name = name
    dbInfo.path = sanitize(name)
    const key = DbInfo.generateKey()
    dbInfo.setPassword(key, password)

    const db = await openDb(true, dbInfo.path, key)
    await this.dbs.indexDb.manager.save(DbInfo, dbInfo)
    this.dbs.setAppDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async openDb(
    @Arg('dbId') dbId: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
  ): Promise<Boolean> {
    const dbInfo = await this.dbs.indexDb.getRepository(DbInfo).findOneOrFail(dbId)
    const key = dbInfo.getKey(password)
    const db = await openDb(true, dbInfo.path, key)
    this.dbs.setAppDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async closeDb(): Promise<Boolean> {
    this.dbs.setAppDb(undefined)
    return true
  }

  @Mutation(returns => Boolean)
  async deleteDb(
    @Arg('dbId') dbId: string,
  ): Promise<Boolean> {
    const dbInfo = await this.dbs.indexDb.getRepository(DbInfo).findOneOrFail(dbId)
    await deleteDb(dbInfo.path)
    await this.dbs.indexDb.createQueryBuilder()
      .delete()
      .from(DbInfo)
      .where('dbId = :dbId', { dbId })
      .execute()
    return true
  }
}
