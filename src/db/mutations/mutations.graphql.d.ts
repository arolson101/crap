import { ExecutableDocumentNode, MutationFcn } from '../graphql-types'
import * as T from './mutations-types'

export const CreateDb: ExecutableDocumentNode<T.CreateDb.Variables, T.CreateDb.Mutation>
export type CreateDb = MutationFcn<T.CreateDb.Variables, T.CreateDb.Mutation>

export const OpenDb: ExecutableDocumentNode<T.OpenDb.Variables, T.OpenDb.Mutation>
export type OpenDb = MutationFcn<T.OpenDb.Variables, T.OpenDb.Mutation>

export const CloseDb: ExecutableDocumentNode<T.CloseDb.Variables, T.CloseDb.Mutation>
export type CloseDb = MutationFcn<T.CloseDb.Variables, T.CloseDb.Mutation>

export const DeleteDb: ExecutableDocumentNode<T.DeleteDb.Variables, T.DeleteDb.Mutation>
export type DeleteDb = MutationFcn<T.DeleteDb.Variables, T.DeleteDb.Mutation>

export const SaveBank: ExecutableDocumentNode<T.SaveBank.Variables, T.SaveBank.Mutation>
export type SaveBank = MutationFcn<T.SaveBank.Variables, T.SaveBank.Mutation>

export const DeleteBank: ExecutableDocumentNode<T.DeleteBank.Variables, T.DeleteBank.Mutation>
export type DeleteBank = MutationFcn<T.DeleteBank.Variables, T.DeleteBank.Mutation>

export const SaveAccount: ExecutableDocumentNode<T.SaveAccount.Variables, T.SaveAccount.Mutation>
export type SaveAccount = MutationFcn<T.SaveAccount.Variables, T.SaveAccount.Mutation>

export const DownloadAccountList: ExecutableDocumentNode<T.DownloadAccountList.Variables, T.DownloadAccountList.Mutation>
export type DownloadAccountList = MutationFcn<T.DownloadAccountList.Variables, T.DownloadAccountList.Mutation>

export const DeleteAccount: ExecutableDocumentNode<T.DeleteAccount.Variables, T.DeleteAccount.Mutation>
export type DeleteAccount = MutationFcn<T.DeleteAccount.Variables, T.DeleteAccount.Mutation>

export const SaveTransaction: ExecutableDocumentNode<T.SaveTransaction.Variables, T.SaveTransaction.Mutation>
export type SaveTransaction = MutationFcn<T.SaveTransaction.Variables, T.SaveTransaction.Mutation>

export const DeleteTransaction: ExecutableDocumentNode<T.DeleteTransaction.Variables, T.DeleteTransaction.Mutation>
export type DeleteTransaction = MutationFcn<T.DeleteTransaction.Variables, T.DeleteTransaction.Mutation>

export const DownloadTransactions: ExecutableDocumentNode<T.DownloadTransactions.Variables, T.DownloadTransactions.Mutation>
export type DownloadTransactions = MutationFcn<T.DownloadTransactions.Variables, T.DownloadTransactions.Mutation>

export const Cancel: ExecutableDocumentNode<T.Cancel.Variables, T.Cancel.Mutation>
export type Cancel = MutationFcn<T.Cancel.Variables, T.Cancel.Mutation>
