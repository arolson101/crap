import { Entity, Column, Index, PrimaryColumn } from 'typeorm/browser'
import { Account } from './AccountResolver'
import { Bank } from './BankResolver'
import * as crypto from 'crypto'

const algorithm = 'aes-192-ccm'

@Entity({ name: 'dbs' })
export class DbInfo {
  @PrimaryColumn() name: string
  @Column() dbName: string

  @Column() algorithm: string
  @Column() nonce: string
  @Column() tag: string
  @Column() cipherKey: string

  setPassword (key: string, password: string) {
    const nonce = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv(algorithm, password, nonce)
    const cipherKey = cipher.update(key, 'utf8', 'base64')
    cipher.final()
    const tag = cipher.getAuthTag()

    this.algorithm = algorithm
    this.nonce = nonce.toString('base64')
    this.tag = tag.toString('base64')
    this.cipherKey = cipherKey
  }

  getKey (password: string): string {
    const nonce = Buffer.from(this.nonce, 'base64')
    const decipher = crypto.createDecipheriv(this.algorithm, password, nonce)
    const tag = Buffer.from(this.tag, 'base64')
    decipher.setAuthTag(tag)
    const key = decipher.update(this.cipherKey, 'base64', 'utf8')
    decipher.final()
    return key
  }
}
