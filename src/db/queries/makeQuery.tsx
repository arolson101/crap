import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { $Values, Subtract } from 'utility-types'
import { ErrorMessage } from '../../components/index'

export interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

export type QueryDesc<V, Q> = {
  query: DocumentNode
  __variables?: V
  __results?: Q
  refetchQuery: (variables: V) => { query: DocumentNode; variables: V }
}

export const makeQueryDesc = <V extends {}, Q>(query: DocumentNode): QueryDesc<V, Q> => ({
  query,
  refetchQuery: (variables) => ({ query, variables })
})

export type Defined<T> = T extends undefined ? never : T

export const withQuery = <R extends Record<string, QueryDesc<V1, Q1>>, V1 extends {}, Q1 extends {}>(
  queryDesc: R,
  getVariables?: (props: any) => V1 | undefined
) => {
  type QD = $Values<R>
  type Q = Defined<QD['__results']>
  type V = QD['__variables']
  type WrappedProps = { [K in keyof R]: Q }
  return <P extends WrappedProps>(Component: React.ComponentType<P>) => {
    const name = Object.keys(queryDesc)[0]
    const desc = queryDesc[name]
    type HocProps = Subtract<P, WrappedProps>
    class WrappedQuery extends React.Component<HocProps> {
      static displayName: string = `WrappedQuery(${Component.displayName || Component.name || ''})`
      constructor(props: HocProps) {
        super(props)
        console.log(`query`, Component.displayName)
      }
      render () {
        const variables = typeof getVariables === 'function' ? getVariables(this.props as any) : getVariables
        if (getVariables && !variables) {
          const componentProps = { [name]: { loading: false } }
          return (
            <Component {...this.props as any} {...componentProps} />
          )
        } else {
          return (
            <Query
              query={desc.query}
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
                  const componentProps = { [name]: { ...result.data } }
                  return <Component {...this.props as any} {...componentProps} />
                }
              }}
            </Query>
          )
        }
      }
    }

    return hoistStatics(WrappedQuery, Component)
  }
}
