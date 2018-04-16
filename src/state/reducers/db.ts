import { getType } from 'typesafe-actions';
import { actions, RootAction } from '../actions';
import { AppDatabase } from '../AppDatabase';
import { GraphQLClient, makeClient } from '../GraphQLClient';

export interface State {
  db?: AppDatabase;
  dbs: string[];
  isOpening: boolean;
  openError?: Error;

  bankCreating?: boolean | Error;
  bankUpdating?: boolean | Error;
  bankDeleting?: boolean | Error;
  accountCreating?: boolean | Error;
  accountUpdating?: boolean | Error;
  accountDeleting?: boolean | Error;
}

export const dbSelectors = {
  getDb: (state: State) => {
    if (!state.db) {
      throw new Error('db is not open');
    }
    return state.db;
  },
  getDbs: (state: State) => {
    return state.dbs;
  },
  getDbOpenError: (state: State) => {
    return state.openError;
  },
  getDbIsOpen: (state: State): boolean => {
    return !!state.db;
  },

  isBankCreating: (state: State) => !!state.bankCreating,
  isBankUpdating: (state: State) => !!state.bankUpdating,
  isBankDeleting: (state: State) => !!state.bankDeleting,
  isAccountCreating: (state: State) => !!state.accountCreating,
  isAccountUpdating: (state: State) => !!state.accountUpdating,
  isAccountDeleting: (state: State) => !!state.accountDeleting,
};

const initialState: State = {
  db: undefined,
  dbs: [],
  isOpening: false,
  openError: undefined,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.dbSetAvailableDbs):
      return { ...state, dbs: action.dbs };

    case getType(actions.dbOpenBegin):
      return { ...state, db: undefined, openError: undefined };

    case getType(actions.dbOpenSuccess):
      return { ...state, db: action.db };

    case getType(actions.dbOpenFailure):
      return { ...state, openError: action.err };

    case getType(actions.bankCreating):
      return { ...state, bankCreating: action.creating };

    case getType(actions.bankUpdating):
      return { ...state, bankUpdating: action.updating };

    case getType(actions.bankDeleting):
      return { ...state, bankDeleting: action.deleting };

    case getType(actions.accountCreating):
      return { ...state, accountCreating: action.creating };

    case getType(actions.accountUpdating):
      return { ...state, accountUpdating: action.updating };

    case getType(actions.accountDeleting):
      return { ...state, accountDeleting: action.deleting };

    default:
      return state;
  }
};

export default reducer;
