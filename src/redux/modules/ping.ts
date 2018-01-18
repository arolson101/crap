import { createAction, getType } from 'typesafe-actions';
import { RootAction } from './';

export type State = {
  readonly isPinging: boolean;
};

const defaultState: State = ({
  isPinging: false
});

export const actions = {
  ping: createAction('PING'),
  pong: createAction('PONG')
};

const reducer = (state: State = defaultState, action: RootAction) => {
  switch (action.type) {
    case getType(actions.ping):
      return { isPinging: true };

    case getType(actions.pong):
      return { isPinging: false };

    default:
      return state;
  }
};

export default reducer;
