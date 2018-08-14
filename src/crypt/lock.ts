import * as crypto from 'crypto'
import { random } from 'lodash'

export interface KeyInfo {
  salt: string
  iterations: number
  keylen: number
  digest: string
}

export interface CipherInfo {
  algorithm: string
  iv: string
}

export interface EncryptedData {
  cipherText: string
  authTag: string
}

export interface KeyDoc {
  keyInfo: KeyInfo
  cipherInfo: CipherInfo
  masterKeyData: EncryptedData
}

const createKeyInfo = (): KeyInfo => {
  const salt = crypto.randomBytes(16).toString('base64')
  const iterations = random(64000, 64000 + 20000)
  const keylen = 32
  const digest = 'sha512'
  return { salt, iterations, keylen, digest }
}

const computeKey = (password: string, info: KeyInfo): Buffer => {
  const { salt, iterations, keylen, digest } = info
  return crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), iterations, keylen, digest)
}

const createCipherInfo = (): CipherInfo => {
  const algorithm = 'aes-256-gcm'
  const iv = crypto.randomBytes(16).toString('base64')
  return { algorithm, iv }
}

const createCipher = (key: Buffer, info: CipherInfo) => {
  const { algorithm, iv } = info
  return crypto.createCipheriv(algorithm, key, Buffer.from(iv, 'base64'))
}

const createDecipher = (key: Buffer, info: CipherInfo) => {
  const { algorithm, iv } = info
  return crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'base64'))
}

const encryptMasterKey = (key: Buffer, cipher: crypto.Cipher): EncryptedData => {
  const cipherText = Buffer.concat([
    cipher.update(key),
    cipher.final()
  ]).toString('base64')
  const authTag = cipher.getAuthTag().toString('base64')
  return { cipherText, authTag }
}

const decryptMasterKey = (decipher: crypto.Decipher, masterKey: EncryptedData): Buffer => {
  decipher.setAuthTag(Buffer.from(masterKey.authTag, 'base64'))
  const key = Buffer.concat([
    decipher.update(Buffer.from(masterKey.cipherText, 'base64')),
    decipher.final() // will throw if auth tag doesn't match
  ])
  return key
}

export const createKeyDoc = (password: string) => {
  const keyBytes = 32
  const masterKey = crypto.randomBytes(keyBytes)

  const keyInfo = createKeyInfo()
  const passKey = computeKey(password, keyInfo)

  const cipherInfo = createCipherInfo()
  const cipher = createCipher(passKey, cipherInfo)

  const masterKeyData = encryptMasterKey(masterKey, cipher)

  const doc: KeyDoc = {
    keyInfo,
    cipherInfo,
    masterKeyData
  }
  return { masterKey, doc }
}

export const openKeyDoc = (doc: KeyDoc, password: string): Buffer => {
  const passKey = computeKey(password, doc.keyInfo)
  const decipher = createDecipher(passKey, doc.cipherInfo)
  const masterKey = decryptMasterKey(decipher, doc.masterKeyData)
  return masterKey
}
