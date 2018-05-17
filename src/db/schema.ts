// import { makeExecutableSchema } from 'graphql-tools'
// import resolvers from './resolvers'
// import typeDefs from './schema.graphql'

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })

import { Input, ID, Field, Type, makeSchema, Mutation, String, Boolean } from 'graphql-typescript'
import {
  None,
  Db,
  Account, AccountInput,
  Bank, BankInput,
  getDb, getBank, toBank, getAccount, toAccount
} from './types'
import { AppDatabase } from './AppDatabase'
import { ResolverContext } from './AppDbProvider'

class AccountArgs {
  @Field accountId: string
}

class BankArgs {
  @Field bankId: string
}

@Type class Query {
  @Field db: Db

  @Field(Bank) async bank(_: any, args: BankArgs, context: ResolverContext) {
    const db = getDb(context)
    const res = await getBank(db, args.bankId)
    return toBank(res)
  }

  @Field([Bank]) async banks (_: any, args: None, context: ResolverContext) {
    const db = getDb(context)
    const res = await db.banks.where({ _deleted: 0 }).toArray()
    return res.map(toBank)
  }

  @Field(Account) async account(_: any, args: AccountArgs, context: ResolverContext) {
    const db = getDb(context)
    const res = await getAccount(db, args.accountId)
    return toAccount(res)
  }
}

const schema = makeSchema(Query, {
  types: [
    Db,
    Bank, BankInput,
    Account, AccountInput,
  ]
})

export default schema
