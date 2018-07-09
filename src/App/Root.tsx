import * as React from 'react'
import { IntlProvider } from 'react-intl'
import cuid from 'cuid'
import { textComponent } from '../components/textComponent'
import { AppDbProvider, DbDependencies, deleteDb, openDb } from '../db'
import { ReduxProvider } from '../redux'
import App from './App'
import { Router } from './Router'

const dependencies: DbDependencies = {
  getTime: () => Date.now(),
  genId: () => cuid(),
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
