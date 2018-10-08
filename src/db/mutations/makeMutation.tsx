import hoistStatics from 'hoist-non-react-statics'
import { Toast } from 'native-base'
import * as React from 'react'
import { $Values, Subtract } from 'utility-types'
import { Spinner } from '../../components/index'
import { Defined } from '../queries'
import { Container } from 'typedi'
import { GraphQLService } from '../services/GraphQLService'
import { ExecutableDocumentNode } from '../graphql-types'

type CompletionFcn<TRet> = (result: TRet) => any

interface MutationFcnOptions<TRet> {
  noSpinner?: boolean
  cancel?: () => any
  complete?: CompletionFcn<TRet>
  finally?: () => any
}

export const withMutation = <R extends Record<string, ExecutableDocumentNode<V1, R1>>, V1 extends {}, R1 extends {}>(
  mutationDesc: R
) => {
  type MD = $Values<R>
  type TRes = Defined<MD['__results']>
  type TVariables = MD['__variables']
  type WrappedProps = { [K in keyof R]: ExecutableDocumentNode<TRes, TVariables> }

  const name = Object.keys(mutationDesc)[0]
  const desc = mutationDesc[name]

  return <P extends WrappedProps>(Component: React.ComponentType<P>) => {
    type HocProps = Subtract<P, WrappedProps>
    type State = MutationFcnOptions<TRes> & {
      loading: boolean
    }

    class WrappedMutation extends React.Component<HocProps, State> {
      static displayName: string = `WrappedMutation(${Component.displayName || Component.name || ''})`

      state: State = { loading: false }
      mounted = true
      // execute: MutationFn<any, OperationVariables> | undefined

      componentWillUnmount() {
        this.mounted = false
        this.closeToast()
      }

      wrapExecute = async (variables: TVariables, options?: MutationFcnOptions<TRes>) => {
        // console.log('wrapExecute', { variables, options })
        this.closeToast()
        const gql = Container.get(GraphQLService)
        // if (!this.execute) {
        //   throw new Error('execute was not set')
        // }
        if (options) {
          this.setState(options)
        }
        try {
          this.setState({ loading: true })
          const results = await gql.execute(desc, variables)
          if (results.errors && results.errors.length > 0) {
            throw results.errors[0]
          }
          this.onCompleted(results.data as TRes)
        } catch (error) {
          this.onError(error)
        } finally {
          if (this.mounted) {
            this.setState({ loading: false })
          }
        }
      }

      onCompleted = (results: TRes) => {
        // console.log('onCompleted', { results })
        const { complete, finally: Finally } = this.state
        if (complete) {
          complete(results)
        }
        if (Finally) {
          Finally()
        }
      }

      onError = (error: Error) => {
        console.log('onError', error.message, { error })
        Toast.show({
          text: error.message,
          buttonText: 'Okay',
          duration: 0,
          type: 'danger'
        })
        const { finally: Finally } = this.state
        if (Finally) {
          Finally()
        }
      }

      onCancel = () => {
        const { cancel } = this.state
        if (cancel) {
          cancel()
        } else {
          // console.log(`can't cancel`)
        }
      }

      render() {
        const { loading } = this.state
        const componentProps = { [name]: this.wrapExecute }
        console.log(`makeMutation ${Component.displayName}`)
        return (
          <>
            <Spinner
              cancelable={!!this.state.cancel}
              onCancel={this.onCancel}
              visible={loading && !this.state.noSpinner}
            />
            <Component {...this.props} {...componentProps} />
          </>
        )
      }

      closeToast = () => {
        (Toast as any).toastInstance._root.closeToast()
      }
    }

    return hoistStatics(WrappedMutation, Component)
  }
}
