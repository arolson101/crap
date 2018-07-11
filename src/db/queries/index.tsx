import { QueryDesc } from './makeQuery'
import * as QT from './queries-types'
import * as GQL from './queries.graphql'

export namespace Queries {
  export type Account = QT.Account.Query
  export const account: QueryDesc<QT.Account.Variables, QT.Account.Query> = { query: GQL.Account }

  export type Accounts = QT.Accounts.Query
  export const accounts: QueryDesc<QT.Accounts.Variables, QT.Accounts.Query> = { query: GQL.Accounts }

  export type Bank = QT.Bank.Query
  export const bank: QueryDesc<QT.Bank.Variables, QT.Bank.Query> = { query: GQL.Bank }

  export type Banks = QT.Banks.Query
  export const banks: QueryDesc<QT.Banks.Variables, QT.Banks.Query> = { query: GQL.Banks }

  export type Dbs = QT.Dbs.Query
  export const dbs: QueryDesc<QT.Dbs.Variables, QT.Dbs.Query> = { query: GQL.Dbs }
}
