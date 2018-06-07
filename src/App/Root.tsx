import * as React from 'react'
import { IntlProvider } from 'react-intl'
import * as shortid from 'shortid'
import { openDb, deleteDb, AppDbProvider, DbDependencies } from '../db'
import App from './App'
import { Router } from './Router'
import { textComponent } from './textComponent'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')

const dependencies: DbDependencies = {
  getTime: () => Date.now(),
  genId: shortid,
  openDb,
  deleteDb,
}

const Root = () => (
  <IntlProvider locale='en' textComponent={textComponent}>
    <AppDbProvider dependencies={dependencies}>
      <Router>
        <App />
      </Router>
    </AppDbProvider>
  </IntlProvider>
)

export default Root
