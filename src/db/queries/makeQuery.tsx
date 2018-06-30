import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Omit } from 'utility-types'

export interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

export const makeQuery = (QUERY: DocumentNode) =>
  <N extends keyof O, O extends Record<N, QueryType<any>>, R = Omit<O, N>>(
    name: N,
    variablesFcn?: (props: R) => Object | undefined
  ) =>
    (Component: React.ComponentType<O>) => {
      class WrappedQuery extends React.Component<R> {
        render () {
          const variables = variablesFcn && variablesFcn(this.props)
          const skip = variablesFcn && !variables
          if (skip) {
            const componentProps: O = { ...(this.props as any), [name]: { loading: false } }
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
                  const componentProps: O = { ...(this.props as any), [name]: { data, ...rest } }
                  return <Component {...componentProps} />
                }}
              </Query>
            )
          }
        }
      }

      // WrappedQuery.displayName =
      return hoistStatics(WrappedQuery, Component as any)
      return WrappedQuery as React.ComponentType<R>
    }
