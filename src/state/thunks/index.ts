import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AppDatabase } from '../AppDatabase';
import fiThunks from './fiThunks';
import initThunks from './initThunks';

export interface ThunkDependencies {
  getTime: () => number;
  genId: () => string;
  openDb: typeof AppDatabase.open;
}

export interface RootThunk<T = any> extends ThunkAction<Promise<T>, RootState, ThunkDependencies> {}

export const thunks = {
  ...fiThunks,
  ...initThunks,
};
