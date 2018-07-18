import { InMemoryCache } from 'apollo-cache-inmemory'
import GraphQLClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { runQuery } from 'apollo-server-core'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Observable from 'zen-observable-ts'
import { actions } from '../redux/actions/index'
import { AppState, selectors } from '../redux/reducers/index'
import { openDb } from './openDb'
import schema from './schema'

export interface ResolverContext {
  indexDb: NonNullable<selectors.returnOf['getIndexDb']>
  appDb: selectors.returnOf['getAppDb']
  setAppDb: actions['setAppDb']
  formatMessage: (id: FormattedMessage.MessageDescriptor) => string
}

interface Props {
  indexDb: selectors.returnOf['getIndexDb']
  appDb: selectors.returnOf['getAppDb']
  setAppDb: actions['setAppDb']
  setIndexDb: actions['setIndexDb']
  login: actions['login']
  logout: actions['logout']
}

class AppDbProviderComponent extends React.Component<Props & InjectedIntlProps> {
  client = new GraphQLClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation, forward) => {
      return new Observable(observer => {
        const context: ResolverContext = {
          indexDb: this.props.indexDb!,
          appDb: this.props.appDb,
          setAppDb: this.props.setAppDb,
          formatMessage: this.props.intl.formatMessage,
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

  async componentDidMount () {
    const indexDb = await openDb(false, 'index', '')
    this.props.setIndexDb(indexDb)
  }

  componentDidUpdate (prevProps: Props) {
    const { login, logout, appDb } = this.props
    if (prevProps.appDb !== appDb) {
      const isOpen = !!appDb
      if (isOpen) {
        login()
      } else {
        logout()
      }
    }
  }

  render () {
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

export const AppDbProvider = compose(
  injectIntl,
  connect(
    (state: AppState): Partial<Props> => ({
      indexDb: selectors.getIndexDb(state)!,
      appDb: selectors.getAppDb(state),
    }),
    {
      setIndexDb: actions.setIndexDb,
      setAppDb: actions.setAppDb,
      login: actions.login,
      logout: actions.logout,
    }
  )
)(AppDbProviderComponent) as any
