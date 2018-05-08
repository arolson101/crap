import * as React from 'react';
import { setConfig } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { AppRegistry, Platform } from 'react-native';
import * as shortid from 'shortid';
import { Router } from './Router';
import App from './components/App';
import { AppDatabase } from './db/AppDatabase';
import { AppDbProvider, DbDependencies } from './db/AppDbProvider';

if (module.hot && process.env.NODE_ENV !== 'production') {
  setConfig({ logLevel: 'debug' })
}

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

AppRegistry.registerComponent('App', () => Root)

if (Platform.OS === 'web') {
  const runApp = () => {
    AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })
  }

  runApp()

  const registerServiceWorker = require('./registerServiceWorker').default
  registerServiceWorker()

  // if (module.hot) {
  //   module.hot.accept('./components/App', () => {
  //     runApp()
  //   })
  // }
}
