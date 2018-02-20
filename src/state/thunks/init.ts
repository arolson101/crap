import { actions } from '../actions';
import { RootThunk } from './';

export default {
  init: (): RootThunk => async function init(dispatch) {
    await Promise.all([
      dispatch(actions.dbInit()),
      dispatch(actions.fiInit()),
    ]);
  },
};
