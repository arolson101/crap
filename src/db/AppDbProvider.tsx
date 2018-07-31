import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../redux/actions/index'
import { AppState, selectors } from '../redux/reducers/index'
import { pickT } from '../util/pick'
import { openDb } from './openDb'
import { compose } from 'redux'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { Container } from '../../node_modules/typedi'
import { DbService } from '../redux/reducers/dbReducer'

interface Props {
  appGraphQLClient: selectors.returnOf['getAppGraphQLClient']
  initDb: actions['initDb']
}

class AppDbProviderComponent extends React.Component<Props & InjectedIntlProps> {
  async componentDidMount() {
    const { appGraphQLClient, initDb, intl: { formatMessage } } = this.props
    if (!appGraphQLClient) {
      const indexDb = await openDb(false, 'index', '')
      const db = Container.get(DbService)
      console.assert(db)
      db.indexDb = indexDb
      initDb(indexDb, formatMessage)
    }
  }

  render() {
    const { appGraphQLClient, children } = this.props
    if (!appGraphQLClient) {
      return <Text>loading</Text>
    }
    return (
      <ApolloProvider client={appGraphQLClient}>
        {children}
      </ApolloProvider>
    )
  }
}

export const AppDbProvider = compose(
  injectIntl,
  connect(
    (state: AppState): Partial<Props> => ({
      appGraphQLClient: selectors.getAppGraphQLClient(state),
    }),
    pickT(actions, 'initDb')
  ),
)(AppDbProviderComponent)
