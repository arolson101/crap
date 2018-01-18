import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './modules';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );

  return store;
}

if (module.hot) {
  module.hot.accept('./modules/index', () => {
    const nextRootEpic = require('./modules/index').default;
    epicMiddleware.replaceEpic(nextRootEpic);
  });
}
