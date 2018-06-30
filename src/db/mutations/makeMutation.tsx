import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { Mutation, MutationFunc } from 'react-apollo'
import { Omit } from 'utility-types'

export interface MutationType<TData, TVariables> {
  execute: MutationFunc<TData, TVariables>
  loading: boolean
  error?: Error
  called: boolean
  data: TData | undefined
}

export const makeMutation = (QUERY: DocumentNode, refetchQueries: DocumentNode[] = []) =>
  <N extends keyof O, O extends Record<N, MutationType<any, any>>, R = Omit<O, N>>(name: N) =>
    (Component: React.ComponentType<O>) => {
      class WrappedMutation extends React.Component<R> {
        render () {
          return (
            <Mutation
              mutation={QUERY}
              refetchQueries={refetchQueries.map(query => ({ query }))}
            >
              {(execute, result) => {
                const componentProps = { ...(this.props as any), [name]: { execute, ...result } }
                return <Component {...componentProps} />
              }}
            </Mutation>
          )
        }
      }

      return hoistStatics(WrappedMutation, Component as any)
    }
