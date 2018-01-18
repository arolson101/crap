import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './modules';

const epicMiddleware = createEpicMiddleware(rootEpic);

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );

  return store;
}

if (module.hot) {
  module.hot.accept('./epics', () => {
    const nextRootEpic = require('./epics').rootEpic;
    epicMiddleware.replaceEpic(nextRootEpic);
  });
}
