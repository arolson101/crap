import keyBy from 'lodash-es/keyBy';
import merge from 'lodash-es/merge';
import omit from 'lodash-es/omit';
import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';
import { Bank, Account } from '../records';
import { Record } from '../Record';

export { Bank };

export interface Dictionary<T> {
  [id: string]: T;
}

export type State = {
  readonly banks: Dictionary<Bank>;
  readonly accounts: Dictionary<Account>;
};

const defaultState: State = ({
  banks: {},
  accounts: {},
});

export const viewsSelectors = {
  getBank: (state: State, bankId: Bank.Id) => state.banks[bankId],
  getAccount: (state: State, accountId: Account.Id) => state.accounts[accountId],
  getAccounts: (state: State, bankId: Bank.Id) =>
    state.banks[bankId].accounts.map(accountId => state.accounts[accountId]),
  getBanks: (state: State): Bank.View[] => Object.values(state.banks).map(bank => ({
    bank,
    accounts: viewsSelectors.getAccounts(state, bank.id),
  })),
};

export const buildDictionary = <T extends Record<any>>(records: T[]): Dictionary<T> => {
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
