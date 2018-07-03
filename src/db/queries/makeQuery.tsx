import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { Omit } from 'utility-types'
import { ErrorMessage } from '../../components/index'

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
            const QueryComponent = Query as any as Query<QueryType<any>>
            return (
              <Query
                query={QUERY}
                variables={variables}
                // fetchPolicy="network-only"
              >
                {(result: QueryResult<QueryType<any>>) => {
                  if (!result.data) {
                    return <ErrorMessage error={new Error('no data')} />
                  } else if (result.error) {
                    return <ErrorMessage error={result.error} />
                  } else if (result.loading) {
                    return null
                  } else {
                    const componentProps: O = { ...(this.props as any), [name]: { ...result.data } }
                    return <Component {...componentProps} />
                  }
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
