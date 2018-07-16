import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../redux/actions/index'
import { AppState, selectors } from '../redux/reducers/index'
import { openDb } from './openDb'

export interface ResolverContext {
  indexDb: NonNullable<selectors.returnOf['getIndexDb']>
  appDb: selectors.returnOf['getAppDb']
  setAppDb: actions['setAppDb']
}

interface Props {
  appGraphQLClient: selectors.returnOf['getAppGraphQLClient']
  indexDb: selectors.returnOf['getIndexDb']
  appDb: selectors.returnOf['getAppDb']
  setAppDb: actions['setAppDb']
  setIndexDb: actions['setIndexDb']
}

class AppDbProviderComponent extends React.Component<Props> {
  async componentDidMount () {
    if (!this.props.indexDb) {
      const indexDb = await openDb(false, 'index', '')
      this.props.setIndexDb(indexDb)
    }
  }

  componentDidUpdate () {
    const { indexDb, appDb, setAppDb, appGraphQLClient } = this.props
    if (indexDb) {
      appGraphQLClient.context = {
        indexDb,
        appDb,
        setAppDb,
      }
    }
  }

  render () {
    const { indexDb, appGraphQLClient, children } = this.props
    if (!indexDb) {
      return <Text>loading</Text>
    }
    return (
      <ApolloProvider client={appGraphQLClient}>
        {children}
      </ApolloProvider>
    )
  }
}

export const AppDbProvider = connect(
  (state: AppState): Partial<Props> => ({
    indexDb: selectors.getIndexDb(state)!,
    appDb: selectors.getAppDb(state),
    appGraphQLClient: selectors.getAppGraphQLClient(state),
  }),
  {
    setIndexDb: actions.setIndexDb,
    setAppDb: actions.setAppDb,
  }
)(AppDbProviderComponent) as any
