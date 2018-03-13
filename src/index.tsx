require('react-hot-loader/patch');
import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { Platform, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import * as shortid from 'shortid';
import { App } from './components/App';
import { LoadFonts } from './components/LoadFonts';
import { createHistory } from './createHistory';
import { configureStore, actions, ThunkDependencies, AppDatabase } from './state';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const dependencies: ThunkDependencies = {
  getTime: () => Date.now(),
  genId: shortid,
  openDb: AppDatabase.open,
};

const store = configureStore(dependencies, [historyMiddleware]);
store.dispatch(actions.init());

const Root = () => (
  <LoadFonts>
    <AppContainer>
      <IntlProvider locale="en">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
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

    module.hot.accept('./state', () => {
      // hopefully configureStore didn't change!
    });
  }
}
