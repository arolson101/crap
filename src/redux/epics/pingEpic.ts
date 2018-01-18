import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { actions, RootAction, RootState } from '../modules';

export const pingEpic: Epic<RootAction, RootState> = (action$, store) =>
action$.filter(isActionOf(actions.ping))
  .delay(1000) // Asynchronously wait 1000ms then continue
  .mapTo(actions.pong());
