import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export type PingState = {
  readonly isPinging: boolean;
};

const defaultState: PingState = ({
  isPinging: false
});

const reducer = (state: PingState = defaultState, action: RootAction): PingState => {
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
