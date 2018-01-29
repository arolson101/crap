import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';

import db, { DbState, dbSelectors } from './db';
import ping, { PingState } from './ping';
import views, { ViewsState, viewsSelectors } from './views';

export interface RootState {
  ping: PingState;
  db: DbState;
  views: ViewsState;
}

export interface ThunkDependencies {
  getTime: () => number;
  genId: () => string;
}

export interface RootThunk<T = any> extends ThunkAction<Promise<T>, RootState, ThunkDependencies> {}

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
  getBank: (state: RootState, id: string) => viewsSelectors.getBank(state.views, id),
};

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
  views,
});

export default rootReducer;
