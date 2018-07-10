import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import { Toast } from 'native-base'
import * as React from 'react'
import { Mutation, MutationFn, OperationVariables } from 'react-apollo'
import { $Values, Subtract } from 'utility-types'
import { Defined } from '../queries/makeQuery'

type CompletionFcn<TRet> = (result: TRet) => any

export type MutationFcn<TRet, TVars> = (vars: TVars, onCompleted?: CompletionFcn<TRet>) => void

export type MutationDesc<TRes, TVars> = {
  mutation: DocumentNode
  refetchQueries: DocumentNode[]
  __variables?: TVars
  __results?: TRes
}

export const withMutation = <R extends Record<string, MutationDesc<R1, V1>>, V1 extends {}, R1 extends {}>(
  mutationDesc: R
) => {
  type MD = $Values<R>
  type TRes = Defined<MD['__results']>
  type TVariables = MD['__variables']
  type WrappedProps = { [K in keyof R]: MutationFcn<TRes, TVariables> }

  const name = Object.keys(mutationDesc)[0]
  const desc = mutationDesc[name]
  const refetchQueries = desc.refetchQueries.map(query => ({ query }))

  return <P extends WrappedProps>(Component: React.ComponentType<P>) => {
    type HocProps = Subtract<P, WrappedProps>
    type State = { onCompleted?: CompletionFcn<TRes> }

    class WrappedMutation extends React.Component<HocProps, State> {
      static displayName: string = `WrappedMutation(${Component.displayName || Component.name || ''})`

      state: State = {}
      execute: MutationFn<any, OperationVariables> | undefined

      wrapExecute = (variables: TVariables, onCompleted?: CompletionFcn<TRes>) => {
        if (this.execute) {
          this.setState({ onCompleted })
          this.execute({ variables })
        }
      }

      onError = (error: Error) => {
        Toast.show({
          text: error.message,
          buttonText: 'Okay',
          duration: 0,
          type: 'danger'
        })
      }

      render () {
        return (
          <Mutation
            mutation={desc.mutation}
            refetchQueries={refetchQueries}
            onCompleted={this.state.onCompleted}
            onError={this.onError}
          >
            {(execute, result) => {
              this.execute = execute
              if (result.loading) {
                return null
              }
              const componentProps = { [name]: this.wrapExecute }
              return <Component {...this.props} {...componentProps} />
            }}
          </Mutation>
        )
      }
    }

    return hoistStatics(WrappedMutation, Component)
  }
}
