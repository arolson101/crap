require('react-hot-loader/patch');
import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Platform, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import * as shortid from 'shortid';
import { App } from './components/App';
import { configureStore } from './state';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

const store = configureStore({
  getTime: () => Date.now(),
  genId: shortid,
});

const Root = () => (
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
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
