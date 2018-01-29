import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export type State = {
  readonly isPinging: boolean;
};

const defaultState: State = ({
  isPinging: false
});

const reducer = (state: State = defaultState, action: RootAction): State => {
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
