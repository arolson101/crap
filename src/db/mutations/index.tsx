import { Queries } from '../queries/index'
import { MutationFcn, MutationDesc } from './makeMutation'
import {
  OpenDb,
  CreateDb,
  DeleteDb,
  SaveBank,
  DeleteBank,
  SaveAccount,
  DeleteAccount,
  SaveTransaction,
  DeleteTransaction,
  DownloadAccountList,
  DownloadTransactions,
  Cancel,
} from './mutations-types'
import * as GQL from './mutations.graphql'

export namespace Mutations {
  export type CreateDb = MutationFcn<CreateDb.Mutation, CreateDb.Variables>
  export const CreateDb: MutationDesc<CreateDb.Mutation, CreateDb.Variables> = {
    mutation: GQL.CreateDb,
    refetchQueries: (results) => [
      Queries.Dbs.refetchQuery({})
    ]
  }

  export type OpenDb = MutationFcn<OpenDb.Mutation, OpenDb.Variables>
  export const OpenDb: MutationDesc<OpenDb.Mutation, OpenDb.Variables> = {
    mutation: GQL.OpenDb,
    refetchQueries: (results) => [
      Queries.Dbs.refetchQuery({})
    ]
  }

  export type DeleteDb = MutationFcn<DeleteDb.Mutation, DeleteDb.Variables>
  export const DeleteDb: MutationDesc<DeleteDb.Mutation, DeleteDb.Variables> = {
    mutation: GQL.DeleteDb,
    refetchQueries: (results) => [
      Queries.Dbs.refetchQuery({})
    ]
  }

  export type SaveBank = MutationFcn<SaveBank.Mutation, SaveBank.Variables>
  export const SaveBank: MutationDesc<SaveBank.Mutation, SaveBank.Variables> = {
    mutation: GQL.SaveBank,
    refetchQueries: (results) => [
      Queries.Banks.refetchQuery({}),
      Queries.Bank.refetchQuery({ bankId: results.data.saveBank.id })
    ]
  }

  export type DeleteBank = MutationFcn<DeleteBank.Mutation, DeleteBank.Variables>
  export const DeleteBank: MutationDesc<DeleteBank.Mutation, DeleteBank.Variables> = {
    mutation: GQL.DeleteBank,
    refetchQueries: (result) => [
      Queries.Banks.refetchQuery({}),
    ]
  }

  export type SaveAccount = MutationFcn<SaveAccount.Mutation, SaveAccount.Variables>
  export const SaveAccount: MutationDesc<SaveAccount.Mutation, SaveAccount.Variables> = {
    mutation: GQL.SaveAccount,
    refetchQueries: (results) => [
      Queries.Bank.refetchQuery({ bankId: results.data.saveAccount.bankId }),
      Queries.Account.refetchQuery({ accountId: results.data.saveAccount.id })
    ]
  }

  export type DeleteAccount = MutationFcn<DeleteAccount.Mutation, DeleteAccount.Variables>
  export const DeleteAccount: MutationDesc<DeleteAccount.Mutation, DeleteAccount.Variables> = {
    mutation: GQL.DeleteAccount,
    refetchQueries: (result) => [
      Queries.Banks.refetchQuery({})
    ]
  }

  export type SaveTransaction = MutationFcn<SaveTransaction.Mutation, SaveTransaction.Variables>
  export const SaveTransaction: MutationDesc<SaveTransaction.Mutation, SaveTransaction.Variables> = {
    mutation: GQL.SaveTransaction,
    refetchQueries: (result) => [
      Queries.Account.refetchQuery({ accountId: result.data.saveTransaction.accountId }),
      Queries.Transaction.refetchQuery({ transactionId: result.data.saveTransaction.id }),
    ]
  }

  export type DeleteTransaction = MutationFcn<DeleteTransaction.Mutation, DeleteTransaction.Variables>
  export const DeleteTransaction: MutationDesc<DeleteTransaction.Mutation, DeleteTransaction.Variables> = {
    mutation: GQL.DeleteTransaction,
    refetchQueries: (result) => [
      Queries.Account.refetchQuery({ accountId: result.data.deleteTransaction.accountId })
    ]
  }

  export type DownloadAccountList = MutationFcn<DownloadAccountList.Mutation, DownloadAccountList.Variables>
  export const DownloadAccountList: MutationDesc<DownloadAccountList.Mutation, DownloadAccountList.Variables> = {
    mutation: GQL.DownloadAccountList,
    refetchQueries: (results) => [
      Queries.Bank.refetchQuery({ bankId: results.data.downloadAccountList.id }),
      ...results.data.downloadAccountList.accounts.map(({ id: accountId }) =>
        Queries.Account.refetchQuery({ accountId })
      )
    ]
  }

  export type DownloadTransactions = MutationFcn<DownloadTransactions.Mutation, DownloadTransactions.Variables>
  export const DownloadTransactions: MutationDesc<DownloadTransactions.Mutation, DownloadTransactions.Variables> = {
    mutation: GQL.DownloadTransactions,
    refetchQueries: (results) => [
      Queries.Account.refetchQuery({ accountId: results.data.downloadTransactions.id }),
    ]
  }

  export type Cancel = MutationFcn<Cancel.Mutation, Cancel.Variables>
  export const Cancel: MutationDesc<Cancel.Mutation, Cancel.Variables> = {
    mutation: GQL.Cancel,
    refetchQueries: (results) => []
  }
}
