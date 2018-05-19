import * as React from 'react'
import { QueryType, makeQuery } from './makeQuery'
import { Account, Accounts, Bank, Banks, Dbs } from './queries-types'
import * as GQL from './queries.graphql'

export namespace Queries {
  export const ACCOUNT = GQL.Account
  export type Account = QueryType<Account.Query>
  export const withAccount = makeQuery(ACCOUNT)

  const ACCOUNTS = GQL.Accounts
  export type Accounts = QueryType<Accounts.Query>
  export const withAccounts = makeQuery(ACCOUNTS)

  export const BANK = GQL.Bank
  export type Bank = QueryType<Bank.Query>
  export const withBank = makeQuery(BANK)

  export const BANKS = GQL.Banks
  export type Banks = QueryType<Banks.Query>
  export const withBanks = makeQuery(BANKS)

  export const DBS = GQL.Dbs
  export type Dbs = QueryType<Dbs.Query>
  export const withDbs = makeQuery(DBS)
}
