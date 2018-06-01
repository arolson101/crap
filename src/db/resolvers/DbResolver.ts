import * as crypto from 'crypto'
import * as sanitize from 'sanitize-filename'
import { Entity, Column, Index, PrimaryColumn } from 'typeorm/browser'
import { Arg, Ctx, Field, ObjectType, Mutation, Query, Resolver, ResolverContext } from './helpers'

const iterations = 10000
const keylen = 32
const digest = 'sha256'
const algorithm = 'aes-256-gcm'

@ObjectType()
@Entity({ name: 'dbs' })
export class DbInfo {
  @PrimaryColumn() @Field() dbId: string
  @Column() @Field() name: string
  @Column() path: string

  @Column() salt: string
  @Column() iterations: number
  @Column() keylen: number
  @Column() digest: string

  @Column() algorithm: string
  @Column() nonce: string
  @Column() cipherKey: string
  @Column() tag: string

  static generateKey () {
    return crypto.randomBytes(32).toString('hex')
  }

  setPassword (key: string, password: string) {
    this.salt = crypto.randomBytes(16).toString('utf8')
    this.iterations = iterations
    this.keylen = keylen
    this.digest = digest

    this.algorithm = algorithm
    this.nonce = crypto.randomBytes(12).toString('utf8')

    const pwbuf = crypto.pbkdf2Sync(password, this.salt, this.iterations, this.keylen, this.digest)
    const cipher = crypto.createCipheriv(algorithm, pwbuf, this.nonce)
    this.cipherKey = cipher.update(key, 'utf8', 'base64')
    this.cipherKey += cipher.final('base64')
    this.tag = cipher.getAuthTag().toString('base64')
  }

  getKey (password: string): string {
    const pwbuf = crypto.pbkdf2Sync(password, this.salt, this.iterations, this.keylen, this.digest)
    const decipher = crypto.createDecipheriv(this.algorithm, pwbuf, this.nonce)
    decipher.setAuthTag(Buffer.from(this.tag, 'base64'))
    const key = decipher.update(this.cipherKey, 'base64', 'utf8')
    decipher.final()
    return key
  }
}

@Resolver(objectType => DbInfo)
export class DbResolver {

  @Query(returns => [DbInfo])
  async allDbs (@Ctx() context: ResolverContext): Promise<DbInfo[]> {
    const indexDb = await context.getIndexDb()
    const dbs = await indexDb.getRepository(DbInfo)
      .find()
    return dbs
  }

  @Mutation(returns => Boolean)
  async createDb (
    @Arg('name') name: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const indexDb = await context.getIndexDb()

    const dbInfo = new DbInfo()
    dbInfo.dbId = crypto.randomBytes(8).toString('base64')
    dbInfo.name = name
    dbInfo.path = sanitize(name)
    const key = DbInfo.generateKey()
    dbInfo.setPassword(key, password)

    const db = await context.openDb(true, key, password)
    indexDb.manager.save(DbInfo, dbInfo)
    context.setAppDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async openDb (
    @Arg('dbId') dbId: string,
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const allDb = await context.getIndexDb()
    const dbInfo = await allDb.getRepository(DbInfo).findOneOrFail(dbId)
    const key = dbInfo.getKey(password)
    const db = await context.openDb(true, dbInfo.path, key)
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

  @Mutation(returns => Boolean)
  async deleteDb (
    @Arg('dbId') dbId: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const allDb = await context.getIndexDb()
    const dbInfo = await allDb.getRepository(DbInfo).findOneOrFail(dbId)
    await context.deleteDb(dbInfo.path)
    await allDb.createQueryBuilder()
      .delete()
      .from(DbInfo)
      .where('dbId = :dbId', { dbId })
      .execute()
    return true
  }
}
