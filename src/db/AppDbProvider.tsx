import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../redux/actions/index'
import { AppState, selectors } from '../redux/reducers/index'
import { pickT } from '../util/pick'
import { openDb } from './openDb'

interface Props {
  appGraphQLClient: selectors.returnOf['getAppGraphQLClient']
  initDb: actions['initDb']
}

class AppDbProviderComponent extends React.Component<Props> {
  async componentDidMount() {
    const { appGraphQLClient, initDb } = this.props
    if (!appGraphQLClient) {
      const indexDb = await openDb(false, 'index', '')
      initDb(indexDb)
    }
  }

  render() {
    const { appGraphQLClient, children } = this.props
    if (!appGraphQLClient) {
      return <Text>loading</Text>
    }
    console.log('render')
    return (
      <ApolloProvider client={appGraphQLClient}>
        {children}
      </ApolloProvider>
    )
  }
}

export const AppDbProvider = connect(
  (state: AppState): Partial<Props> => ({
    appGraphQLClient: selectors.getAppGraphQLClient(state),
  }),
  pickT(actions, 'initDb')
)(AppDbProviderComponent)
