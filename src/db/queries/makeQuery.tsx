import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { $Values, Subtract } from 'utility-types'
import { ErrorMessage } from '../../components/index'
import { Container } from 'typedi'
import { GraphQLService } from '../services/GraphQLService'
import { ExecutableDocumentNode } from '../graphql-types'

export interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

export type Defined<T> = T extends undefined ? never : T

export const withQuery = <R extends Record<string, ExecutableDocumentNode<V1, Q1>>, V1 extends {}, Q1 extends {}>(
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
        try {
          const gql = Container.get(GraphQLService)
          const variables = typeof getVariables === 'function' ? getVariables(this.props as any) : getVariables
          if (!getVariables || variables) {
            const result = await gql.execute(desc, variables)
            if (result.errors && result.errors.length > 0) {
              throw result.errors[0]
            }
            if (this.mounted) {
              this.setState({ result: result.data })
            }
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
    }

    return hoistStatics(WrappedQuery, Component)
  }
}
