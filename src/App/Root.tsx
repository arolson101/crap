import * as React from 'react'
import { IntlProvider } from 'react-intl'
import * as shortid from 'shortid'
import { textComponent } from '../components/textComponent'
import { AppDbProvider, DbDependencies, deleteDb, openDb } from '../db'
import { ReduxProvider } from '../redux'
import App from './App'
import { Router } from './Router'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')

const dependencies: DbDependencies = {
  getTime: () => Date.now(),
  genId: shortid,
  openDb,
  deleteDb,
}

const Root = () => (
  <ReduxProvider>
    <IntlProvider locale='en' textComponent={textComponent}>
      <AppDbProvider dependencies={dependencies}>
        <Router>
          <App />
        </Router>
      </AppDbProvider>
    </IntlProvider>
  </ReduxProvider>
)

export default Root
