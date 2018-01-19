import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './modules';

export function configureStore() {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );

  if (module.hot) {
    module.hot.accept('./epics', () => {
      const nextRootEpic = require('./epics').rootEpic;
      epicMiddleware.replaceEpic(nextRootEpic);
      // console.log('epics updated');
    });

    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').rootReducer;
      store.replaceReducer(nextRootReducer);
      // console.log('reducer updated');
    });
  }

  return store;
}
