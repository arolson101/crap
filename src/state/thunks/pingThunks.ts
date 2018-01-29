import { actions } from '../actions';
import { RootThunk } from '../';

export default {
  pingPong: (): RootThunk => async function pingPongThunk(dispatch) {
    dispatch(actions.ping());
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    dispatch(actions.pong());
  },
};
