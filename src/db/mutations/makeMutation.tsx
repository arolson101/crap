import { DocumentNode } from 'graphql'
import hoistStatics from 'hoist-non-react-statics'
import { Toast } from 'native-base'
import * as React from 'react'
import { Mutation, MutationFn, OperationVariables } from 'react-apollo'
import { Omit } from 'utility-types'

type CompletionFcn<TRet> = (result: TRet) => any

export type MutationFcn<TRet, TVars> = (vars: TVars, onCompleted?: CompletionFcn<TRet>) => void

export const makeMutation = <TRet, TVariables>(QUERY: DocumentNode, refetchQueries: DocumentNode[] = []) =>
  <N extends keyof O, O extends Record<N, MutationFcn<TRet, TVariables>>>(name: N) =>
    (Component: React.ComponentType<O>) => {
      type Props = Omit<O, N>
      type State = { onCompleted?: CompletionFcn<TRet> }
      class WrappedMutation extends React.Component<Props, State> {
        state: State = {}
        execute: MutationFn<any, OperationVariables> | undefined

        wrapExecute = (variables: TVariables, onCompleted?: CompletionFcn<TRet>) => {
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
              mutation={QUERY}
              refetchQueries={refetchQueries.map(query => ({ query }))}
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
