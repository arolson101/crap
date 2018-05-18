import Dexie from 'dexie'
import { AppDatabase } from '../AppDatabase'
import { ResolverContext, None, Input, Field, Type, makeSchema, Mutation, String, Boolean } from './helpers'
import { Bank } from './BankType'
import { Account } from './AccountType'

class OpenDbArgs {
  @Field password: String
}

@Type export class Db {
  @Field([String]) async all () {
    const names = await Dexie.getDatabaseNames()
    return names
  }

  @Mutation(Boolean) async openDb (source: any, args: OpenDbArgs, context: ResolverContext) {
    const db = await context.openDb()
    context.setDb(db)
    return true
  }

  @Mutation(Boolean) async closeDb (source: any, args: None, context: ResolverContext) {
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

export const getBank = async (db: AppDatabase, id: string): Promise<Bank> => {
  const bank = await db.banks.where({ id, _deleted: 0 }).first()
  if (!bank) {
    throw new Error(`bank ${id} not found`)
  }
  return bank
}

export const toBank = (dbBank: Bank): Partial<Bank> => {
  const { _deleted, _base, _history, ...rest } = dbBank
  return { ...rest } as any
}

export const getAccount = async (db: AppDatabase, id: string): Promise<Account> => {
  const account = await db.accounts.where({ id, _deleted: 0 }).first()
  if (!account) {
    throw new Error(`account ${id} not found`)
  }
  return account
}

export const toAccount = (account: Account.Interface): Partial<Account.Interface> => {
  const { bankId, _deleted, _base, _history, type: stringType, ...rest } = account
  // const type = ST.AccountType[stringType]
  // return { ...rest, type }
  return { ...rest }
}
