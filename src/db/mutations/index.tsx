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
  GetAccountList,
  GetTransactions,
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

  export type GetAccountList = MutationFcn<GetAccountList.Mutation, GetAccountList.Variables>
  export const getAccountList: MutationDesc<GetAccountList.Mutation, GetAccountList.Variables> = {
    mutation: GQL.GetAccountList,
    refetchQueries: (results) => [
      Queries.bank.refetchQuery({ bankId: results.data.getAccountList.id }),
      ...results.data.getAccountList.accounts.map(({ id: accountId }) =>
        Queries.account.refetchQuery({ accountId })
      )
    ]
  }

  export type GetTransactions = MutationFcn<GetTransactions.Mutation, GetTransactions.Variables>
  export const getTransactions: MutationDesc<GetTransactions.Mutation, GetTransactions.Variables> = {
    mutation: GQL.GetTransactions,
    refetchQueries: (results) => [
      Queries.account.refetchQuery({ accountId: results.data.getTransactions.id }),
    ]
  }

  export type Cancel = MutationFcn<Cancel.Mutation, Cancel.Variables>
  export const cancel: MutationDesc<Cancel.Mutation, Cancel.Variables> = {
    mutation: GQL.Cancel,
    refetchQueries: (results) => []
  }
}
