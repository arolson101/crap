import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { $Values, Subtract } from 'utility-types'
import { ErrorMessage } from '../../components/index'
import { Container } from 'typedi'
import { GraphQLService } from '../services/GraphQLService'

export interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

export type QueryDesc<V, Q> = {
  query: DocumentNode
  __variables?: V
  __results?: Q
}

export const makeQueryDesc = <V extends {}, Q>(query: DocumentNode): QueryDesc<V, Q> => ({
  query
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
    type State = {
      loading: boolean
      error: Error | undefined
      result: object | undefined
    }

    class WrappedQuery extends React.Component<HocProps, State> {
      static displayName: string = `WrappedQuery(${Component.displayName || Component.name || ''})`
      state: State = {
        loading: true,
        error: undefined,
        result: {}
      }
      mounted = true

      componentDidMount() {
        this.runQuery()
      }

      componentWillUnmount() {
        this.mounted = false
      }

      async runQuery() {
        const gql = Container.get(GraphQLService)
        const variables = typeof getVariables === 'function' ? getVariables(this.props as any) : getVariables
        if (!getVariables || variables) {
          try {
            const result = await gql.execute(desc.query, variables)
            if (result.errors && result.errors.length > 0) {
              throw result.errors[0]
            }
            if (this.mounted) {
              this.setState({ result: result.data })
            }
          } catch (error) {
            if (this.mounted) {
              this.setState({ error })
            }
          } finally {
            if (this.mounted) {
              this.setState({ loading: false })
            }
          }
        }
      }

      render() {
        const { loading, error, result } = this.state
        const componentProps = { [name]: result }
        if (error) {
          return <ErrorMessage error={error}/>
        } else if (loading) {
          return null
        } else {
          return <Component {...this.props} {...componentProps}/>
        }
      }

      // render () {
      //   const variables = typeof getVariables === 'function' ? getVariables(this.props as any) : getVariables
      //   if (getVariables && !variables) {
      //     const componentProps = { [name]: { loading: false } }
      //     return (
      //       <Component {...this.props as any} {...componentProps} />
      //     )
      //   } else {
      //     return (
      //       <Query
      //         query={desc.query}
      //         variables={variables as V}
      //         // fetchPolicy="network-only"
      //       >
      //         {(result: QueryResult<QueryType<any>>) => {
      //           if (!result.data || Object.keys(result.data).length === 0) {
      //             return <ErrorMessage error={new Error('no data')} />
      //           } else if (result.error) {
      //             return <ErrorMessage error={result.error} />
      //           } else if (result.loading) {
      //             return null
      //           } else {
      //             const componentProps = { [name]: { ...result.data } }
      //             return <Component {...this.props as any} {...componentProps} />
      //           }
      //         }}
      //       </Query>
      //     )
      //   }
      // }
    }

    return hoistStatics(WrappedQuery, Component)
  }
}
