import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import accountThunks from './accountThunks';
import bankThunks from './bankThunks';
import dbThunks from './dbThunks';
import fiThunks from './fiThunks';
import initThunks from './initThunks';
import pingThunks from './pingThunks';

export interface ThunkDependencies {
  getTime: () => number;
  genId: () => string;
}

export interface RootThunk<T = any> extends ThunkAction<Promise<T>, RootState, ThunkDependencies> {}

export const thunks = {
  ...pingThunks,
  ...dbThunks,
  ...fiThunks,
  ...initThunks,
  ...accountThunks,
  ...bankThunks,
};
