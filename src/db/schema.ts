import { Field, Type, makeSchema } from 'graphql-typescript'
import { ResolverContext } from './AppDbProvider'
import { Account, AccountInput, Bank, BankInput, Db, None, getAccount, getBank, getDb, toAccount, toBank } from './types'

class AccountArgs {
  @Field accountId: string
}

class BankArgs {
  @Field bankId: string
}

@Type class Query {
  @Field(Db) db () {
    return new Db()
  }

  @Field(Bank) async bank (_: any, args: BankArgs, context: ResolverContext) {
    const db = getDb(context)
    const res = await getBank(db, args.bankId)
    return toBank(res)
  }

  @Field([Bank]) async banks (_: any, args: None, context: ResolverContext) {
    const db = getDb(context)
    const res = await db.banks.where({ _deleted: 0 }).toArray()
    return res.map(toBank)
  }

  @Field(Account) async account (_: any, args: AccountArgs, context: ResolverContext) {
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
