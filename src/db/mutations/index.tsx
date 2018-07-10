import * as React from 'react'
import { Queries } from '../queries'
import { MutationFcn, MutationDesc } from './makeMutation'
import {
  DeleteAccount,
  DeleteBank,
  OpenDb,
  CreateDb,
  DeleteDb,
  SaveAccount,
  SaveBank
} from './mutations-types'
import * as GQL from './mutations.graphql'

export namespace Mutations {
  export type DeleteBank = MutationFcn<DeleteBank.Mutation, DeleteBank.Variables>
  export const deleteBank: MutationDesc<DeleteBank.Mutation, DeleteBank.Variables> = { mutation: GQL.DeleteBank, refetchQueries: [Queries.banks.query] }

  export type DeleteAccount = MutationFcn<DeleteAccount.Mutation, DeleteAccount.Variables>
  export const deleteAccount: MutationDesc<DeleteAccount.Mutation, DeleteAccount.Variables> = { mutation: GQL.DeleteAccount, refetchQueries: [Queries.banks.query] }

  export type CreateDb = MutationFcn<CreateDb.Mutation, CreateDb.Variables>
  export const createDb: MutationDesc<CreateDb.Mutation, CreateDb.Variables> = { mutation: GQL.CreateDb, refetchQueries: [] }

  export type OpenDb = MutationFcn<OpenDb.Mutation, OpenDb.Variables>
  export const openDb: MutationDesc<OpenDb.Mutation, OpenDb.Variables> = { mutation: GQL.OpenDb, refetchQueries: [] }

  export type DeleteDb = MutationFcn<DeleteDb.Mutation, DeleteDb.Variables>
  export const deleteDb: MutationDesc<DeleteDb.Mutation, DeleteDb.Variables> = { mutation: GQL.DeleteDb, refetchQueries: [Queries.dbs.query] }

  export type SaveAccount = MutationFcn<SaveAccount.Mutation, SaveAccount.Variables>
  export const saveAccount: MutationDesc<SaveAccount.Mutation, SaveAccount.Variables> = { mutation: GQL.SaveAccount, refetchQueries: [Queries.banks.query] }

  export type SaveBank = MutationFcn<SaveBank.Mutation, SaveBank.Variables>
  export const saveBank: MutationDesc<SaveBank.Mutation, SaveBank.Variables> = { mutation: GQL.SaveBank, refetchQueries: [Queries.banks.query] }
}
