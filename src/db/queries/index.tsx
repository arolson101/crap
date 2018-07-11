import { QueryDesc, makeQueryDesc } from './makeQuery'
import * as QT from './queries-types'
import * as Q from './queries.graphql'

export namespace Queries {
  export type Account = QT.Account.Query
  export const account = makeQueryDesc<QT.Account.Variables, QT.Account.Query>(Q.Account)

  export type Accounts = QT.Accounts.Query
  export const accounts = makeQueryDesc<QT.Accounts.Variables, QT.Accounts.Query>(Q.Accounts)

  export type Bank = QT.Bank.Query
  export const bank = makeQueryDesc<QT.Bank.Variables, QT.Bank.Query>(Q.Bank)

  export type Banks = QT.Banks.Query
  export const banks = makeQueryDesc<QT.Banks.Variables, QT.Banks.Query>(Q.Banks)

  export type Dbs = QT.Dbs.Query
  export const dbs = makeQueryDesc<QT.Dbs.Variables, QT.Dbs.Query>(Q.Dbs)
}
