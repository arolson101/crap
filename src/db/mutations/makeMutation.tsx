import { PureQueryOptions } from 'apollo-client'
import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import { Toast } from 'native-base'
import * as React from 'react'
import { Mutation, MutationFn, OperationVariables } from 'react-apollo'
import { $Values, Subtract } from 'utility-types'
import { Spinner } from '../../components/index'
import { Defined } from '../queries/makeQuery'

type CompletionFcn<TRet> = (result: TRet) => any

interface MutationFcnOptions<TRet> {
  cancel?: () => any
  complete?: CompletionFcn<TRet>
  finally?: () => any
}
export type MutationFcn<TRet, TVars> = (vars: TVars, options?: MutationFcnOptions<TRet>) => void

export type MutationDesc<TRes, TVars> = {
  mutation: DocumentNode
  refetchQueries: (results: { data: TRes }) => PureQueryOptions[]
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

  return <P extends WrappedProps>(Component: React.ComponentType<P>) => {
    type HocProps = Subtract<P, WrappedProps>
    type State = MutationFcnOptions<TRes>

    class WrappedMutation extends React.Component<HocProps, State> {
      static displayName: string = `WrappedMutation(${Component.displayName || Component.name || ''})`

      state: State = {}
      execute: MutationFn<any, OperationVariables> | undefined

      wrapExecute: MutationFcn<TRes, TVariables> = (variables: TVariables, options?: MutationFcnOptions<TRes>) => {
        if (this.execute) {
          if (options) {
            this.setState(options)
          }
          this.execute({ variables })
        }
      }

      onCompleted = (results: TRes) => {
        const { complete, finally: Finally } = this.state
        if (complete) {
          complete(results)
        }
        if (Finally) {
          Finally()
        }
      }

      onError = (error: Error) => {
        const { finally: Finally } = this.state
        if (Finally) {
          Finally()
        }
        Toast.show({
          text: error.message,
          buttonText: 'Okay',
          // duration: 5000,
          type: 'danger'
        })
      }

      onCancel = () => {
        const { cancel } = this.state
        if (cancel) {
          cancel()
        } else {
          console.log(`can't cancel`)
        }
      }

      render () {
        return (
          <Mutation
            mutation={desc.mutation}
            refetchQueries={desc.refetchQueries}
            onCompleted={this.onCompleted}
            onError={this.onError}
          >
            {(execute, result) => {
              this.execute = execute
              const componentProps = { [name]: this.wrapExecute }
              return (
                <>
                  <Spinner
                    cancelable={!!this.state.cancel}
                    onCancel={this.onCancel}
                    visible={result.loading}
                  />
                  <Component {...this.props} {...componentProps} />
                </>
              )
            }}
          </Mutation>
        )
      }
    }

    return hoistStatics(WrappedMutation, Component)
  }
}
