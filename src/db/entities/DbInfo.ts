import * as crypto from 'crypto'
import { Column, Entity, PrimaryColumn } from '../typeorm'
import { Field, ObjectType } from './helpers'

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

  static generateKey() {
    return `x'${crypto.randomBytes(32).toString('hex')}'`
  }

  setPassword(key: string, password: string) {
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

  getKey(password: string): string {
    const pwbuf = crypto.pbkdf2Sync(password, this.salt, this.iterations, this.keylen, this.digest)
    const decipher = crypto.createDecipheriv(this.algorithm, pwbuf, this.nonce)
    decipher.setAuthTag(Buffer.from(this.tag, 'base64'))
    const key = decipher.update(this.cipherKey, 'base64', 'utf8')
    decipher.final()
    return key
  }
}
