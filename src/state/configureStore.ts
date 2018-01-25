import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThunkDependencies } from './';
import { rootReducer } from './modules';

export function configureStore(dependencies: ThunkDependencies) {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument(dependencies)
      )
    )
  );

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').rootReducer;
      store.replaceReducer(nextRootReducer);
      // console.log('reducer updated');
    });
  }

  return store;
}
