import { InMemoryCache } from 'apollo-cache-inmemory'
import GraphQLClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { runQuery } from 'apollo-server-core'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import Observable from 'zen-observable-ts'
import { ctx } from '../App/ctx'
import schema from '../db/schema'
import { actions } from '../redux/actions/index'
import { AppState, AppStore, selectors } from '../redux/reducers/index'
import { Connection } from './typeorm'

export interface DbDependencies {
  getTime: () => number
  genId: () => string
  openDb: (app: boolean, name: string, key: string) => Promise<Connection>
  deleteDb: (name: string) => Promise<void>
}

export interface ResolverContext extends DbDependencies {
  indexDb: Connection
  appDb: Connection | null
  setAppDb: (appDb: Connection | null) => any
}

interface Props {
  dependencies: DbDependencies

  setIndexDb: (indexDb: Connection) => any
  indexDb: Connection | null
  appDb: Connection | null
  setAppDb: (appDb: Connection | null) => any
}

class AppDbProviderComponent extends React.Component<Props> {
  static contextTypes = ctx.store

  client = new GraphQLClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation, forward) => {
      return new Observable(observer => {
        const context: ResolverContext = {
          ...this.props.dependencies,
          indexDb: this.props.indexDb!,
          appDb: this.props.appDb,
          setAppDb: this.props.setAppDb,
        }

        const opts = {
          schema,
          query: operation.query,
          variables: operation.variables,
          context
        }

        const exe = runQuery(opts as any)
        exe.then(res => {
          observer.next(res as any)
          observer.complete()
        }).catch(err => {
          observer.error(err)
          observer.complete()
        })
      })
    })
  })

  async componentDidMount() {
    const indexDb = await this.props.dependencies.openDb(false, 'index', '')
    this.props.setIndexDb(indexDb)
  }

  render() {
    if (!this.props.indexDb) {
      return <Text>loading</Text>
    }
    return (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    )
  }
}

export const AppDbProvider = connect(
  (state: AppState): Partial<Props> => ({
    indexDb: selectors.getIndexDb(state)!,
    appDb: selectors.getAppDb(state),
  }),
  {
    setIndexDb: actions.setIndexDb,
    setAppDb: actions.setAppDb,
  }
)(AppDbProviderComponent)
