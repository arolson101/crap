require('react-hot-loader/patch');
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './redux';

const store = configureStore();

const Root = () => (
  <AppContainer>
    <Provider store={store}>
      <App/>
    </Provider>
  </AppContainer>
);

AppRegistry.registerComponent('App', () => Root);

const runApp = () => {
  AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
};

runApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    runApp();
  });

  module.hot.accept('./redux', () => {
    // hopefully configureStore didn't change!
  });
}

registerServiceWorker();
