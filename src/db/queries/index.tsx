import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'

interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

const makeQuery = (QUERY: DocumentNode) =>
  (name: string, variablesFcn?: (props: any) => Object | undefined) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        const variables = variablesFcn && variablesFcn(props)
        const skip = variablesFcn && !variables
        if (skip) {
          const componentProps = { ...props, [name]: { loading: false } }
          return (
            <Component {...componentProps} />
          )
        } else {
          return (
            <Query
              query={QUERY}
              variables={variables}
              // fetchPolicy="network-only"
            >
              {({ data, ...rest }) => {
                const componentProps = { ...props, [name]: { data, ...rest } }
                return <Component {...componentProps} />
              }}
            </Query>
          )
        }
      }

import {
  Account,
  Accounts,
  Bank,
  Banks,
  Dbs,
} from './query-types'

export namespace Queries {
  // Account
  export const ACCOUNT = gql`
    query Account($accountId: String!) {
      account(accountId: $accountId) {
        id
        name
        type
        color
        number
        visible
        routing
        key
      }
    }
  `
  export type Account = QueryType<Account.Query>
  export const withAccount = makeQuery(ACCOUNT)

  // Accounts
  const ACCOUNTS = gql`
    query Accounts {
      banks {
        id
        name
        accounts {
          id
          name
          # balance
        }
      }
    }
  `
  export type Accounts = QueryType<Accounts.Query>
  export const withAccounts = makeQuery(ACCOUNTS)

  // Bank($bankId)
  export const BANK = gql`
    query Bank($bankId: String!) {
      bank(bankId: $bankId) {
        id
        name
        web
        address
        notes
        favicon
        online
        fid
        org
        ofx
        username
        password

        accounts {
          id
          name
        }
      }
    }
  `
  export type Bank = QueryType<Bank.Query>
  export const withBank = makeQuery(BANK)

  // Banks
  export const BANKS = gql`
    query Banks {
      banks {
        id
        name
        accounts {
          id
          name
        }
      }
    }
  `
  export type Banks = QueryType<Banks.Query>
  export const withBanks = makeQuery(BANKS)

  // Dbs
  export const DBS = gql`
    query Dbs {
      allDbs
    }
  `
  export type Dbs = QueryType<Dbs.Query>
  export const withDbs = makeQuery(DBS)
}
