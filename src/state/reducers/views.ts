import keyBy from 'lodash-es/keyBy';
import merge from 'lodash-es/merge';
import omit from 'lodash-es/omit';
import { getType } from 'typesafe-actions';
import { Record } from '../Record';
import { Bank } from '../docs';
import { actions, RootAction } from '../actions';

export { Bank };

export interface Dictionary<T> {
  [id: string]: T;
}

export type ViewsState = {
  readonly banks: Dictionary<Bank>;
};

const defaultState: ViewsState = ({
  banks: {},
});

export const viewsSelectors = {
  getBank: (state: ViewsState, id: string) => state.banks[id],
};

const buildDictionary = <T extends Record<any>>(records: T[]): Dictionary<T> => {
  return keyBy(records, record => record.id);
};

const reducer = (state: ViewsState = defaultState, action: RootAction): ViewsState => {
  switch (action.type) {
    case getType(actions.recordsUpdated):
      return { ...state, [action.table]: merge(state[action.table], buildDictionary(action.records)) };

    case getType(actions.recordsDeleted):
      return { ...state, [action.table]: omit(state[action.table], action.ids) };

    default:
      return state;
  }
};

export default reducer;
