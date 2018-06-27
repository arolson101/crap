import { DocumentNode } from 'graphql'
import * as React from 'react'
import { Query } from 'react-apollo'
const hoistStatics = require('hoist-non-react-statics')

export interface QueryType<TData> {
  data: TData
  loading: boolean
  error?: Error
}

export const makeQuery = (QUERY: DocumentNode) =>
  (name: string, variablesFcn?: (props: any) => Object | undefined) =>
    (Component: React.ComponentType<any>) => {
      class WrappedQuery extends React.Component<{}> {
        render() {
          const variables = variablesFcn && variablesFcn(this.props)
          const skip = variablesFcn && !variables
          if (skip) {
            const componentProps = { ...this.props, [name]: { loading: false } }
            return (
              <Component {...componentProps} />
            )
          } else {
            return (
              <Query
                query={QUERY}
                variables={variables}
                // fetchPolicy="network-only"
              >
                {({ data, ...rest }) => {
                  const componentProps = { ...this.props, [name]: { data, ...rest } }
                  return <Component {...componentProps} />
                }}
              </Query>
            )
          }
        }
      }

      // WrappedQuery.displayName =
      return hoistStatics(WrappedQuery, Component)
    }
