import { MutationFcn, MutationDesc } from './makeMutation'
import {
  OpenDb,
  CreateDb,
  CloseDb,
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
    mutation: GQL.CreateDb
  }

  export type OpenDb = MutationFcn<OpenDb.Mutation, OpenDb.Variables>
  export const OpenDb: MutationDesc<OpenDb.Mutation, OpenDb.Variables> = {
    mutation: GQL.OpenDb
  }

  export type CloseDb = MutationFcn<CloseDb.Mutation, CloseDb.Variables>
  export const CloseDb: MutationDesc<CloseDb.Mutation, CloseDb.Variables> = {
    mutation: GQL.CloseDb
  }

  export type DeleteDb = MutationFcn<DeleteDb.Mutation, DeleteDb.Variables>
  export const DeleteDb: MutationDesc<DeleteDb.Mutation, DeleteDb.Variables> = {
    mutation: GQL.DeleteDb
  }

  export type SaveBank = MutationFcn<SaveBank.Mutation, SaveBank.Variables>
  export const SaveBank: MutationDesc<SaveBank.Mutation, SaveBank.Variables> = {
    mutation: GQL.SaveBank
  }

  export type DeleteBank = MutationFcn<DeleteBank.Mutation, DeleteBank.Variables>
  export const DeleteBank: MutationDesc<DeleteBank.Mutation, DeleteBank.Variables> = {
    mutation: GQL.DeleteBank
  }

  export type SaveAccount = MutationFcn<SaveAccount.Mutation, SaveAccount.Variables>
  export const SaveAccount: MutationDesc<SaveAccount.Mutation, SaveAccount.Variables> = {
    mutation: GQL.SaveAccount
  }

  export type DeleteAccount = MutationFcn<DeleteAccount.Mutation, DeleteAccount.Variables>
  export const DeleteAccount: MutationDesc<DeleteAccount.Mutation, DeleteAccount.Variables> = {
    mutation: GQL.DeleteAccount
  }

  export type SaveTransaction = MutationFcn<SaveTransaction.Mutation, SaveTransaction.Variables>
  export const SaveTransaction: MutationDesc<SaveTransaction.Mutation, SaveTransaction.Variables> = {
    mutation: GQL.SaveTransaction
  }

  export type DeleteTransaction = MutationFcn<DeleteTransaction.Mutation, DeleteTransaction.Variables>
  export const DeleteTransaction: MutationDesc<DeleteTransaction.Mutation, DeleteTransaction.Variables> = {
    mutation: GQL.DeleteTransaction
  }

  export type DownloadAccountList = MutationFcn<DownloadAccountList.Mutation, DownloadAccountList.Variables>
  export const DownloadAccountList: MutationDesc<DownloadAccountList.Mutation, DownloadAccountList.Variables> = {
    mutation: GQL.DownloadAccountList
  }

  export type DownloadTransactions = MutationFcn<DownloadTransactions.Mutation, DownloadTransactions.Variables>
  export const DownloadTransactions: MutationDesc<DownloadTransactions.Mutation, DownloadTransactions.Variables> = {
    mutation: GQL.DownloadTransactions
  }

  export type Cancel = MutationFcn<Cancel.Mutation, Cancel.Variables>
  export const Cancel: MutationDesc<Cancel.Mutation, Cancel.Variables> = {
    mutation: GQL.Cancel
  }
}
