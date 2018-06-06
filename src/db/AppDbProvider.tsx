import GraphQLClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Connection } from 'typeorm/browser'
import Observable from 'zen-observable-ts'
import schema from '../db/schema'
import { runQuery } from 'apollo-server-core'
import { DbContext } from '../App/ctx'

export interface DbDependencies {
  getTime: () => number
  genId: () => string
  openDb: (app: boolean, name: string, key: string) => Promise<Connection>
  deleteDb: (name: string) => Promise<void>
}

export interface ResolverContext extends DbDependencies {
  getIndexDb: () => Promise<Connection>
  getAppDb: () => Connection
  setAppDb: (db: Connection | undefined) => any
}

interface Props {
  dependencies: DbDependencies
}

interface State {
  db: Connection | undefined
}

export class AppDbProvider extends React.Component<Props, State> {
  state: State = {
    db: undefined
  }

  indexDb: Promise<Connection>

  client = new GraphQLClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation, forward) => {
      return new Observable(observer => {
        const context: ResolverContext = {
          ...this.props.dependencies,
          getAppDb: this.getAppDb,
          setAppDb: this.setAppDb,
          getIndexDb: this.getIndexDb,
        }
        const opts = {
          schema,
          query: operation.query,
          variables: operation.variables,
          context
        }
        const exe = runQuery(opts)
        if ('then' in exe) {
          exe.then(res => {
            observer.next(res)
            observer.complete()
          }).catch(err => {
            observer.error(err)
            observer.complete()
          })
        } else {
          observer.next(exe)
          observer.complete()
        }
      })
    })
  })

  getIndexDb = () => this.indexDb

  async componentDidMount () {
    this.indexDb = this.props.dependencies.openDb(false, 'index', '')
  }

  setAppDb = (db: Connection | undefined) => {
    this.setState({ db })
  }

  getAppDb = (): Connection => {
    const db = this.state.db
    if (!db) {
      throw new Error('db not open')
    }
    return db
  }

  render () {
    return (
      <ApolloProvider client={this.client}>
        <DbContext.Provider value={{ isOpen: !!this.state.db }}>
          {this.props.children}
        </DbContext.Provider>
      </ApolloProvider>
    )
  }
}
