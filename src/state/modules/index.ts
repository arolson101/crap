import { getReturnOfExpression } from 'react-redux-typescript';
import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';

import ping, { PingState, pingActions, pingThunks } from './ping';
import db, { DbState, dbActions, dbSelectors } from './db';
import bankThunks from '../thunks/bankThunks';
import dbThunks from '../thunks/dbThunks';

const basicActions = {
  ...pingActions,
  ...dbActions,
};

export const actions = {
  ...basicActions,
  ...pingThunks,
  ...dbThunks,
  ...bankThunks,
};

export const selectors = {
  getDb: (state: RootState) => dbSelectors.getDb(state.db),
};

const returnOfActions = Object.values(basicActions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;

export interface RootState {
  ping: PingState;
  db: DbState;
}

export interface ThunkDependencies {
  getTime: () => number;
  genId: () => string;
}

export interface RootThunk<T = any> extends ThunkAction<Promise<T>, RootState, ThunkDependencies> {}

export const rootReducer = combineReducers<RootState>({
  ping,
  db,
});

export default rootReducer;
