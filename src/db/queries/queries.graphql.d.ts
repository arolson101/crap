import { ExecutableDocumentNode, MutationFcn } from '../graphql-types'
import * as T from './queries-types'

export const Banks: ExecutableDocumentNode<T.Banks.Variables, T.Banks.Query>
export type Banks = T.Banks.Query

export const Bank: ExecutableDocumentNode<T.Bank.Variables, T.Bank.Query>
export type Bank = T.Bank.Query

export const Accounts: ExecutableDocumentNode<T.Accounts.Variables, T.Accounts.Query>
export type Accounts = T.Accounts.Query

export const Account: ExecutableDocumentNode<T.Account.Variables, T.Account.Query>
export type Account = T.Account.Query

export const Transaction: ExecutableDocumentNode<T.Transaction.Variables, T.Transaction.Query>
export type Transaction = T.Transaction.Query

export const Dbs: ExecutableDocumentNode<T.Dbs.Variables, T.Dbs.Query>
export type Dbs = T.Dbs.Query
