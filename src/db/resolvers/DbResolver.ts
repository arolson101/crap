import Dexie from 'dexie'
import { AppDatabase } from '../AppDatabase'
import { Account } from './AccountResolver'
import { Bank } from './BankResolver'
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, ResolverContext } from './helpers'

@ObjectType()
class Db {
  @Field(type => [String]) all: string[]
}

@Resolver(objectType => Db)
export class DbResolver {

  @Query(returns => [String])
  async allDbs (): Promise<string[]> {
    const names = await Dexie.getDatabaseNames()
    return names
  }

  @Mutation(returns => Boolean)
  async openDb (
    @Arg('password', { description: 'the password for the database' }) password: string,
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
    const db = await context.openDb()
    context.setDb(db)
    return true
  }

  @Mutation(returns => Boolean)
  async closeDb (
    @Ctx() context: ResolverContext
  ): Promise<Boolean> {
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

export const toBank = (dbBank: Bank): Bank => {
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

export const toAccount = (account: Account.Interface): Account => {
  const { bankId, _deleted, _base, _history, type: stringType, ...rest } = account
  // const type = ST.AccountType[stringType]
  // return { ...rest, type }
  return { ...rest } as any
}
