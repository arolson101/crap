import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';

export function configureStore(middlewares: Middleware[] = []) {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        ...middlewares,
        thunk,
      )
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').rootReducer;
      store.replaceReducer(nextRootReducer);
      // console.log('reducer updated');
    });
  }

  return store;
}
