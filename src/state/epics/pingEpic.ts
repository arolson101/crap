import { isActionOf } from 'typesafe-actions';
import { actions, RootEpic } from '../modules';

export const pingEpic: RootEpic = (action$, store) =>
action$.filter(isActionOf(actions.ping))
  .delay(1000) // Asynchronously wait 1000ms then continue
  .mapTo(actions.pong());
