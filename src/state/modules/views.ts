import keyBy from 'lodash-es/keyBy';
import merge from 'lodash-es/merge';
import omit from 'lodash-es/omit';
import { createAction, getType } from 'typesafe-actions';
import { TableName } from '../AppDatabase';
import { Record } from '../Record';
import { Bank } from '../docs';
import { RootAction } from './';

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

export const viewsActions = {
  viewsRecordsUpdated: createAction('views/RECORDS_UPDATED', (table: TableName, records: Record<any>[]) => ({
    type: 'views/RECORDS_UPDATED', table, records
  })),
  viewsRecordsDeleted: createAction('views/RECORDS_DELETED', (table: TableName, ids: string[]) => ({
    type: 'views/RECORDS_DELETED', table, ids
  }))
};

export const viewsSelectors = {
  getBank: (state: ViewsState, id: string) => state.banks[id],
};

const buildDictionary = <T extends Record<any>>(records: T[]): Dictionary<T> => {
  return keyBy(records, record => record.id);
};

const reducer = (state: ViewsState = defaultState, action: RootAction): ViewsState => {
  switch (action.type) {
    case getType(viewsActions.viewsRecordsUpdated):
      return { ...state, [action.table]: merge(state[action.table], buildDictionary(action.records)) };

    case getType(viewsActions.viewsRecordsDeleted):
      return { ...state, [action.table]: omit(state[action.table], action.ids) };

    default:
      return state;
  }
};

export default reducer;
