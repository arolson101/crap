import { combineReducers } from 'redux';
import { getReturnOfExpression } from 'react-redux-typescript';

import ping, { State as PingState, actions as pingActions } from './ping';

export const actions = {
  ...pingActions
};

const returnOfActions =
  Object.values(actions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;

export interface RootState {
  ping: PingState;
}

export const rootReducer = combineReducers<RootState>({
  ping,
});

export default rootReducer;
