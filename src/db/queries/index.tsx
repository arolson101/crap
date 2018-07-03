import * as React from 'react'
import { QueryType, makeQuery } from './makeQuery'
import { Account, Accounts, Bank, Banks, Dbs } from './queries-types'
import * as GQL from './queries.graphql'

export namespace Queries {
  export const ACCOUNT = GQL.Account
  export type Account = Account.Query
  export const withAccount = makeQuery(ACCOUNT)

  const ACCOUNTS = GQL.Accounts
  export type Accounts = Accounts.Query
  export const withAccounts = makeQuery(ACCOUNTS)

  export const BANK = GQL.Bank
  export type Bank = Bank.Query
  export const withBank = makeQuery(BANK)

  export const BANKS = GQL.Banks
  export type Banks = Banks.Query
  export const withBanks = makeQuery(BANKS)

  export const DBS = GQL.Dbs
  export type Dbs = Dbs.Query
  export const withDbs = makeQuery(DBS)
}
