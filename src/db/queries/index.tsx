import * as React from 'react'
import { QueryType, makeQuery } from './makeQuery'
import { Account, Accounts, Bank, Banks, Dbs } from './queries-types'
import * as GQL from './queries.graphql'

export namespace Queries {
  export const ACCOUNT = GQL.Account
  export type Account = Account.Query
  export const withAccount = makeQuery<Account.Variables>(ACCOUNT)

  const ACCOUNTS = GQL.Accounts
  export type Accounts = Accounts.Query
  export const withAccounts = makeQuery<Accounts.Variables>(ACCOUNTS)

  export const BANK = GQL.Bank
  export type Bank = Bank.Query
  export const withBank = makeQuery<Bank.Variables>(BANK)

  export const BANKS = GQL.Banks
  export type Banks = Banks.Query
  export const withBanks = makeQuery<Banks.Variables>(BANKS)

  export const DBS = GQL.Dbs
  export type Dbs = Dbs.Query
  export const withDbs = makeQuery<Dbs.Variables>(DBS)
}
