import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import fiThunks from './fiThunks';
import initThunks from './initThunks';

export interface RootThunk<T = any> extends ThunkAction<Promise<T>, RootState, {}> {}

export const thunks = {
  ...fiThunks,
  ...initThunks,
};
