import crypto from 'isomorphic-webcrypto'
import sanitize from 'sanitize-filename'
import { Entity, Column, Index, PrimaryColumn } from 'typeorm/browser'
import { Arg, Ctx, Field, ObjectType, Mutation, Query, Resolver, ResolverContext } from './helpers'

const iterations = 10000
const keylen = 256
const digest = 'SHA-256'
const algorithm = 'AES-GCM'

const randomBytes = (count: number, encoding: 'hex' | 'base64' | 'utf8') => {
  const values = new Uint8Array(count)
  crypto.getRandomValues(values)
  return new Buffer(values).toString(encoding)
}

const deriveKey = async (password: string, salt: string, digest: string, algorithm: AesDerivedKeyParams, usage: 'encrypt' | 'decrypt') => {
  const pwbuf: Uint8Array = Buffer.from(password)
  const saltbuf: Uint8Array = Buffer.from(salt, 'base64')
  const importKey = await crypto.subtle.importKey('raw', pwbuf, { name: 'PBKDF2' } as any, false, ['deriveBits', 'deriveKey'])
  const derivedKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltbuf, iterations, hash: { name: digest } },
    importKey,
    algorithm,
    true,
    [usage]
  )
  return derivedKey
}

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
    return randomBytes(32, 'hex')
  }

  async setKey (key: string, password: string) {
    this.salt = randomBytes(16, 'base64')
    this.iterations = iterations
    this.keylen = keylen
    this.digest = digest

    this.algorithm = algorithm
    this.nonce = randomBytes(12, 'base64')

    const alg = { name: this.algorithm, iv: Buffer.from(this.nonce, 'base64'), length: this.keylen }
    const pwkey = await deriveKey(password, this.salt, this.digest, alg, 'encrypt')
    const cipherKey = await crypto.subtle.encrypt(alg, pwkey, Buffer.from(key, 'utf8'))
    this.cipherKey = new Buffer(cipherKey).toString('base64')
  }

  async getKey (password: string) {
    const alg = { name: this.algorithm, iv: Buffer.from(this.nonce, 'base64'), length: this.keylen }
    const pwkey = await deriveKey(password, this.salt, this.digest, alg, 'decrypt')
    const key = await crypto.subtle.decrypt(alg, pwkey, Buffer.from(this.cipherKey, 'base64'))
    return new Buffer(key).toString('utf8')
  }

  async changePassword (oldPassword: string, newPassword: string) {
    const key = await this.getKey(oldPassword)
    this.setKey(key, newPassword)
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
    dbInfo.dbId = randomBytes(8, 'base64')
    dbInfo.name = name
    dbInfo.path = sanitize(name)
    const key = DbInfo.generateKey()
    await dbInfo.setKey(key, password)

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
    const key = await dbInfo.getKey(password)
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
}
