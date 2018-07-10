import * as React from 'react'
import { QueryType, makeQuery, QueryDesc } from './makeQuery'
import { Account, Accounts, Bank, Banks, Dbs } from './queries-types'
import * as GQL from './queries.graphql'

export namespace Queries {

  export type Account = Account.Query
  export type Accounts = Accounts.Query
  export type Bank = Bank.Query
  export type Banks = Banks.Query
  export type Dbs = Dbs.Query

  export const bank: QueryDesc<Bank.Variables, Bank.Query> = { query: GQL.Bank }
  export const banks: QueryDesc<Banks.Variables, Banks.Query> = { query: GQL.Banks }
  export const account: QueryDesc<Account.Variables, Account.Query> = { query: GQL.Account }
  export const accounts: QueryDesc<Accounts.Variables, Accounts.Query> = { query: GQL.Accounts }
  export const dbs: QueryDesc<Dbs.Variables, Dbs.Query> = { query: GQL.Dbs }
}
