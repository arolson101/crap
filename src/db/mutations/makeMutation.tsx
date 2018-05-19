import { DocumentNode } from 'graphql'
import * as React from 'react'
import { Mutation, MutationFunc } from 'react-apollo'

export interface MutationType<TData, TVariables> {
  execute: MutationFunc<TData, TVariables>
  loading: boolean
  error?: Error
  called: boolean
  data: TData | undefined
}

export const makeMutation = (QUERY: DocumentNode, refetchQueries: DocumentNode[] = []) =>
  (name: string) =>
    (Component: React.ComponentType<any>) =>
      (props: React.Props<{}>) => {
        return (
          <Mutation
            mutation={QUERY}
            refetchQueries={refetchQueries.map(query => ({ query }))}
          >
            {(execute, result) => {
              const componentProps = { ...props, [name]: { execute, ...result } }
              return <Component {...componentProps} />
            }}
          </Mutation>
        )
      }
