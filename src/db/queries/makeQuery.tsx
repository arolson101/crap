import { DocumentNode } from 'graphql'
import * as React from 'react'
import { Query } from 'react-apollo'

export interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

export const makeQuery = (QUERY: DocumentNode) =>
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
