import { createAction, getType } from 'typesafe-actions';
import { RootAction, RootThunk } from './';

export type PingState = {
  readonly isPinging: boolean;
};

const defaultState: PingState = ({
  isPinging: false
});

export const pingActions = {
  ping: createAction('ping/PING'),
  pong: createAction('ping/PONG')
};

export const pingThunks = {
  pingPong: (): RootThunk => async (dispatch) => {
    dispatch(pingActions.ping());
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    dispatch(pingActions.pong());
  },
};

const reducer = (state: PingState = defaultState, action: RootAction): PingState => {
  switch (action.type) {
    case getType(pingActions.ping):
      return { isPinging: true };

    case getType(pingActions.pong):
      return { isPinging: false };

    default:
      return state;
  }
};

export default reducer;
