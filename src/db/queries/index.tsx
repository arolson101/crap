import { makeQueryDesc } from './makeQuery'
import * as QT from './queries-types'
import * as Q from './queries.graphql'

export namespace Queries {
  export type Account = QT.Account.Query
  export const Account = makeQueryDesc<QT.Account.Variables, QT.Account.Query>(Q.Account)

  export type Accounts = QT.Accounts.Query
  export const Accounts = makeQueryDesc<QT.Accounts.Variables, QT.Accounts.Query>(Q.Accounts)

  export type Bank = QT.Bank.Query
  export const Bank = makeQueryDesc<QT.Bank.Variables, QT.Bank.Query>(Q.Bank)

  export type Banks = QT.Banks.Query
  export const Banks = makeQueryDesc<QT.Banks.Variables, QT.Banks.Query>(Q.Banks)

  export type Dbs = QT.Dbs.Query
  export const Dbs = makeQueryDesc<QT.Dbs.Variables, QT.Dbs.Query>(Q.Dbs)

  export type Transaction = QT.Transaction.Query
  export const Transaction = makeQueryDesc<QT.Transaction.Variables, QT.Transaction.Query>(Q.Transaction)
}
