import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThunkDependencies } from './';
import { rootReducer } from './reducers';

export function configureStore(dependencies: ThunkDependencies, middlewares: Middleware[] = []) {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        ...middlewares,
        thunk.withExtraArgument(dependencies),
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
