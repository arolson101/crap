import * as React from 'react'
import { Queries } from '../queries'
import { MutationType, makeMutation } from './makeMutation'
import { DeleteAccount, DeleteBank, OpenDb, SaveAccount, SaveBank } from './mutations-types'
import * as GQL from './mutations.graphql'

export namespace Mutations {
  export const DELETEBANK = GQL.DeleteBank
  export const withDeleteBank = makeMutation(DELETEBANK, [Queries.BANKS])
  export type DeleteBank = MutationType<DeleteBank.Mutation, DeleteBank.Variables>

  export const DELETEACCOUNT = GQL.DeleteAccount
  export const withDeleteAccount = makeMutation(DELETEACCOUNT, [Queries.BANKS])
  export type DeleteAccount = MutationType<DeleteAccount.Mutation, DeleteAccount.Variables>

  export const OPENDB = GQL.OpenDb
  export const withOpenDb = makeMutation(OPENDB)
  export type OpenDb = MutationType<OpenDb.Mutation, OpenDb.Variables>

  export const SAVEACCOUNT = GQL.SaveAccount
  export const withSaveAccount = makeMutation(SAVEACCOUNT, [Queries.BANKS])
  export type SaveAccount = MutationType<SaveAccount.Mutation, SaveAccount.Variables>

  export const SAVEBANK = GQL.SaveBank
  export const withSaveBank = makeMutation(SAVEBANK, [Queries.BANKS])
  export type SaveBank = MutationType<SaveBank.Mutation, SaveBank.Variables>
}
