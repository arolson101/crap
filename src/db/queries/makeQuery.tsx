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

type Falsey = '' | 0 | false | null | undefined

export const makeQuery = <V extends {}>(QUERY: DocumentNode) =>
  <N extends keyof O, O extends Record<N, QueryType<any>>, R = Omit<O, N>>(
    name: N,
    getVariables?: V | ((props: Readonly<R>) => V | Falsey)
  ) =>
    (Component: React.ComponentType<O>) => {
      class WrappedQuery extends React.Component<R> {
        static displayName: string = `WrappedQuery(${Component.displayName || ''})`
        render () {
          const variables = typeof getVariables === 'function' ? getVariables(this.props) : getVariables
          if (getVariables && !variables) {
            const componentProps: O = { ...(this.props as any), [name]: { loading: false } }
            return (
              <Component {...componentProps} />
            )
          } else {
            return (
              <Query
                query={QUERY}
                variables={variables as V}
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

      return hoistStatics(WrappedQuery, Component as any)
    }
