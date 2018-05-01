import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, MutationFunc } from 'react-apollo'
import { Queries } from '../queries'

export * from './mutation-types'

interface MutationType<TData, TVariables> {
  execute: MutationFunc<TData, TVariables>
  loading: boolean
  error?: Error
  called: boolean
  data: TData | undefined
}

const makeMutation = (QUERY: DocumentNode, refetchQueries: DocumentNode[] = []) =>
  (name: string) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        return (
          <Mutation
            mutation={QUERY}
            refetchQueries={refetchQueries.map(query => ({ query }))}
          >
            {(execute, result) => {
              const componentProps = { ...props, [name]: { execute, ...result } }
              return <Component {...componentProps} />
            }}
          </Mutation>
        )
      }

import {
  DeleteBankMutation, DeleteBankMutationVariables,
  DeleteAccountMutation, DeleteAccountMutationVariables,
  OpenDbMutation, OpenDbMutationVariables,
  SaveAccountMutation, SaveAccountMutationVariables,
  SaveBankMutation, SaveBankMutationVariables
} from './mutation-types'

export namespace Mutations {
  // DeleteBank
  export const DELETEBANK = gql`
    mutation DeleteBank($bankId: ID!) {
      deleteBank(bankId: $bankId)
    }
  `
  export const withDeleteBank = makeMutation(DELETEBANK, [Queries.BANKS])
  export type DeleteBank = MutationType<DeleteBankMutation, DeleteBankMutationVariables>

  // DeleteBank
  export const DELETEACCOUNT = gql`
    mutation DeleteAccount($accountId: ID!) {
      deleteAccount(accountId: $accountId)
    }
  `
  export const withDeleteAccount = makeMutation(DELETEACCOUNT, [Queries.BANKS])
  export type DeleteAccount = MutationType<DeleteAccountMutation, DeleteAccountMutationVariables>

  // OpenDb
  export const OPENDB = gql`
    mutation OpenDb($password: String!) {
      openDb(password: $password)
    }
  `
  export const withOpenDb = makeMutation(OPENDB)
  export type OpenDb = MutationType<OpenDbMutation, OpenDbMutationVariables>

  // SaveAccount
  export const SAVEACCOUNT = gql`
    mutation SaveAccount($input: AccountInput!, $accountId: ID, $bankId: ID) {
      saveAccount(input: $input, accountId: $accountId, bankId: $bankId) {
        id
      }
    }
  `
  export const withSaveAccount = makeMutation(SAVEACCOUNT, [Queries.BANKS])
  export type SaveAccount = MutationType<SaveAccountMutation, SaveAccountMutationVariables>

  // SaveBank
  export const SAVEBANK = gql`
    mutation SaveBank($input: BankInput!, $bankId: ID) {
      saveBank(input: $input, bankId: $bankId) {
        id
      }
    }
  `
  export const withSaveBank = makeMutation(SAVEBANK, [Queries.BANKS])
  export type SaveBank = MutationType<SaveBankMutation, SaveBankMutationVariables>
}
