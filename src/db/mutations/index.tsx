import * as React from 'react'
import { Queries } from '../queries/index'
import { MutationFcn, MutationDesc } from './makeMutation'
import {
  DeleteAccount,
  DeleteBank,
  OpenDb,
  CreateDb,
  DeleteDb,
  SaveAccount,
  SaveBank,
  DownloadAccountList,
  DownloadTransactions,
  Cancel,
} from './mutations-types'
import * as GQL from './mutations.graphql'

export namespace Mutations {
  export type DeleteBank = MutationFcn<DeleteBank.Mutation, DeleteBank.Variables>
  export const deleteBank: MutationDesc<DeleteBank.Mutation, DeleteBank.Variables> = {
    mutation: GQL.DeleteBank,
    refetchQueries: (result) => [
      Queries.banks.refetchQuery({}),
    ]
  }

  export type DeleteAccount = MutationFcn<DeleteAccount.Mutation, DeleteAccount.Variables>
  export const deleteAccount: MutationDesc<DeleteAccount.Mutation, DeleteAccount.Variables> = {
    mutation: GQL.DeleteAccount,
    refetchQueries: (result) => [
      Queries.banks.refetchQuery({})
    ]
  }

  export type CreateDb = MutationFcn<CreateDb.Mutation, CreateDb.Variables>
  export const createDb: MutationDesc<CreateDb.Mutation, CreateDb.Variables> = {
    mutation: GQL.CreateDb,
    refetchQueries: (results) => [
      Queries.dbs.refetchQuery({})
    ]
  }

  export type OpenDb = MutationFcn<OpenDb.Mutation, OpenDb.Variables>
  export const openDb: MutationDesc<OpenDb.Mutation, OpenDb.Variables> = {
    mutation: GQL.OpenDb,
    refetchQueries: (results) => [
      Queries.dbs.refetchQuery({})
    ]
  }

  export type DeleteDb = MutationFcn<DeleteDb.Mutation, DeleteDb.Variables>
  export const deleteDb: MutationDesc<DeleteDb.Mutation, DeleteDb.Variables> = {
    mutation: GQL.DeleteDb,
    refetchQueries: (results) => [
      Queries.dbs.refetchQuery({})
    ]
  }

  export type SaveAccount = MutationFcn<SaveAccount.Mutation, SaveAccount.Variables>
  export const saveAccount: MutationDesc<SaveAccount.Mutation, SaveAccount.Variables> = {
    mutation: GQL.SaveAccount,
    refetchQueries: (results) => [
      Queries.bank.refetchQuery({ bankId: results.data.saveAccount.bankId }),
      Queries.account.refetchQuery({ accountId: results.data.saveAccount.id })
    ]
  }

  export type SaveBank = MutationFcn<SaveBank.Mutation, SaveBank.Variables>
  export const saveBank: MutationDesc<SaveBank.Mutation, SaveBank.Variables> = {
    mutation: GQL.SaveBank,
    refetchQueries: (results) => [
      Queries.banks.refetchQuery({}),
      Queries.bank.refetchQuery({ bankId: results.data.saveBank.id })
    ]
  }

  export type DownloadAccountList = MutationFcn<DownloadAccountList.Mutation, DownloadAccountList.Variables>
  export const downloadAccountList: MutationDesc<DownloadAccountList.Mutation, DownloadAccountList.Variables> = {
    mutation: GQL.DownloadAccountList,
    refetchQueries: (results) => [
      Queries.bank.refetchQuery({ bankId: results.data.downloadAccountList.id }),
      ...results.data.downloadAccountList.accounts.map(({ id: accountId }) =>
        Queries.account.refetchQuery({ accountId })
      )
    ]
  }

  export type DownloadTransactions = MutationFcn<DownloadTransactions.Mutation, DownloadTransactions.Variables>
  export const gownloadTransactions: MutationDesc<DownloadTransactions.Mutation, DownloadTransactions.Variables> = {
    mutation: GQL.DownloadTransactions,
    refetchQueries: (results) => [
      Queries.account.refetchQuery({ accountId: results.data.downloadTransactions.id }),
    ]
  }

  export type Cancel = MutationFcn<Cancel.Mutation, Cancel.Variables>
  export const cancel: MutationDesc<Cancel.Mutation, Cancel.Variables> = {
    mutation: GQL.Cancel,
    refetchQueries: (results) => []
  }
}
