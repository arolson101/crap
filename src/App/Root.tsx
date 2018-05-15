import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { AppRegistry, Platform } from 'react-native'
import * as shortid from 'shortid'
import App from './App'
import { Router } from './Router'
import { AppDatabase, AppDbProvider, DbDependencies } from '../db'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')

const dependencies: DbDependencies = {
  getTime: () => Date.now(),
  genId: shortid,
  openDb: AppDatabase.open
}

const Root = () => (
  <IntlProvider locale='en'>
    <AppDbProvider dependencies={dependencies}>
      <Router>
        <App />
      </Router>
    </AppDbProvider>
  </IntlProvider>
)

export default Root
