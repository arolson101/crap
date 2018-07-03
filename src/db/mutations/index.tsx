import * as React from 'react'
import { Queries } from '../queries'
import { MutationFcn, makeMutation } from './makeMutation'
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
  export const DELETEBANK = GQL.DeleteBank
  export type DeleteBank = MutationFcn<DeleteBank.Mutation, DeleteBank.Variables>
  export const withDeleteBank = makeMutation<DeleteBank.Mutation, DeleteBank.Variables>(DELETEBANK, [Queries.BANKS])

  export const DELETEACCOUNT = GQL.DeleteAccount
  export type DeleteAccount = MutationFcn<DeleteAccount.Mutation, DeleteAccount.Variables>
  export const withDeleteAccount = makeMutation<DeleteAccount.Mutation, DeleteAccount.Variables>(DELETEACCOUNT, [Queries.BANKS])

  export const CREATEDB = GQL.CreateDb
  export type CreateDb = MutationFcn<CreateDb.Mutation, CreateDb.Variables>
  export const withCreateDb = makeMutation<CreateDb.Mutation, CreateDb.Variables>(CREATEDB)

  export const OPENDB = GQL.OpenDb
  export type OpenDb = MutationFcn<OpenDb.Mutation, OpenDb.Variables>
  export const withOpenDb = makeMutation<OpenDb.Mutation, OpenDb.Variables>(OPENDB)

  export const DELETEDB = GQL.DeleteDb
  export type DeleteDb = MutationFcn<DeleteDb.Mutation, DeleteDb.Variables>
  export const withDeleteDb = makeMutation<DeleteDb.Mutation, DeleteDb.Variables>(DELETEDB, [Queries.DBS])

  export const SAVEACCOUNT = GQL.SaveAccount
  export type SaveAccount = MutationFcn<SaveAccount.Mutation, SaveAccount.Variables>
  export const withSaveAccount = makeMutation<SaveAccount.Mutation, SaveAccount.Variables>(SAVEACCOUNT, [Queries.BANKS])

  export const SAVEBANK = GQL.SaveBank
  export type SaveBank = MutationFcn<SaveBank.Mutation, SaveBank.Variables>
  export const withSaveBank = makeMutation<SaveBank.Mutation, SaveBank.Variables>(SAVEBANK, [Queries.BANKS])
}
