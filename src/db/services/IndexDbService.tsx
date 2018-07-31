import * as crypto from 'crypto'
import sanitize from 'sanitize-filename'
import { Container, Service } from 'typedi'
import { DbInfo } from '../entities/DbInfo'
import { deleteDb, openDb } from '../openDb'
import { Connection, Repository } from '../typeorm'
import { AppDbService } from './AppDbService'

@Service()
export class IndexDbService {
  private indexDbConnection: Connection
  private initPromise: Promise<void>
  private dbInfos: Repository<DbInfo>

  constructor(
    private appService: AppDbService
  ) {
    this.initPromise = this.init()
  }

  private async init() {
    this.indexDbConnection = await openDb(false, 'index', '')
    this.dbInfos = this.indexDbConnection.getRepository(DbInfo)
  }

  async allDbs(): Promise<DbInfo[]> {
    await this.initPromise
    const dbs = await this.dbInfos.find()
    return dbs
  }

  async createDb(name: string, password: string): Promise<Boolean> {
    await this.initPromise
    const dbInfo = new DbInfo()
    dbInfo.dbId = crypto.randomBytes(8).toString('base64')
    dbInfo.name = name
    dbInfo.path = sanitize(name)
    const key = DbInfo.generateKey()
    dbInfo.setPassword(key, password)

    const db = await openDb(true, dbInfo.path, key)
    await this.dbInfos.save(dbInfo)
    this.appService.open(db)
    return true
  }

  async openDb(dbId: string, password: string): Promise<Boolean> {
    await this.initPromise
    console.log('openDb')
    const dbInfo = await this.dbInfos.findOneOrFail(dbId)
    const key = dbInfo.getKey(password)
    const db = await openDb(true, dbInfo.path, key)
    this.appService.open(db)
    return true
  }

  async closeDb(): Promise<Boolean> {
    this.appService.close()
    return true
  }

  async deleteDb(dbId: string): Promise<string> {
    const dbInfo = await this.dbInfos.findOneOrFail(dbId)
    await deleteDb(dbInfo.path)
    await this.dbInfos.createQueryBuilder()
      .delete()
      .from(DbInfo)
      .where('dbId = :dbId', { dbId })
      .execute()
    return dbId
  }
}
