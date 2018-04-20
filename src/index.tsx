require('react-hot-loader/patch');
import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { Platform, AppRegistry } from 'react-native';
import * as shortid from 'shortid';
import { App } from './components/App';
import { LoadFonts } from './components/LoadFonts';
import { Router } from './Router';
import { AppDatabase, AppDbProvider, DbDependencies } from './db';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

const dependencies: DbDependencies = {
  getTime: () => Date.now(),
  genId: shortid,
  openDb: AppDatabase.open,
};

const Root = () => (
  <LoadFonts>
    <AppContainer>
      <IntlProvider locale="en">
        <AppDbProvider dependencies={dependencies}>
          <Router>
            <App />
          </Router>
        </AppDbProvider>
      </IntlProvider>
    </AppContainer>
  </LoadFonts>
);

export default Root;

AppRegistry.registerComponent('App', () => Root);

if (Platform.OS === 'web') {
  const runApp = () => {
    AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
  };

  runApp();

  const registerServiceWorker = require('./registerServiceWorker').default;
  registerServiceWorker();

  if (module.hot) {
    module.hot.accept('./components/App', () => {
      runApp();
    });
  }
}
