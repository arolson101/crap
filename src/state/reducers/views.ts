import keyBy from 'lodash-es/keyBy';
import merge from 'lodash-es/merge';
import omit from 'lodash-es/omit';
import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';
import { Bank } from '../records';
import { Record } from '../Record';

export { Bank };

export interface Dictionary<T> {
  [id: string]: T;
}

export type State = {
  readonly banks: Dictionary<Bank>;
};

const defaultState: State = ({
  banks: {},
});

export const viewsSelectors = {
  getBank: (state: State, id: string) => state.banks[id],
};

const buildDictionary = <T extends Record<any>>(records: T[]): Dictionary<T> => {
  return keyBy(records, record => record.id);
};

const reducer = (state: State = defaultState, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.dbOpenBegin):
      return defaultState;

    case getType(actions.recordsUpdated):
      return { ...state, [action.table]: merge(state[action.table], buildDictionary(action.records)) };

    case getType(actions.recordsDeleted):
      return { ...state, [action.table]: omit(state[action.table], action.ids) };

    default:
      return state;
  }
};

export default reducer;
