import { action } from '@storybook/addon-actions';
import { FinancialInstitution } from 'filist';
import { Middleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RootState, configureStore, ThunkDependencies, Bank, Account } from '../src/state';
import { buildDictionary } from '../src/state/reducers/views';
import { finalizeFilist } from '../src/state/thunks/fiThunks';

export const dependencies: ThunkDependencies = {
  getTime: Date.now,
  genId: () => Date.now().toString(),
  openDb: async (name) => { throw new Error(`can't open databases in storybook`); },
};

const logDispatch = action('dispatch');

const dispatchActionLogger: Middleware = st => next => (act: any) => {
  logDispatch(JSON.stringify(act));
  return next(act);
};

export const middlewares = [dispatchActionLogger];

export const filist = finalizeFilist(require<FinancialInstitution[]>('filist/filist.json'));

export const initDbs = (dbs: string[], openError: Error | undefined = undefined) => ({
  db: {
    dbs,
    isOpening: false,
    openError,
  }
});

export const openedDb = () => ({
  db: {
    db: {} as any,
    dbs: [],
    isOpening: false,
  }
});

const dummyAccount = (id: string, name: string, type: Account.Type): Account => ({
  id: id as Account.Id,
  _deleted: 0,
  name,
  color: '',
  type,
  number: id,
  visible: true,
  bankid: '',
  key: '',
});

const dummyBank = (id: string, name: string, accounts: Account[]): Bank => ({
  id: id as Bank.Id,
  _deleted: 0,
  name,
  accounts: accounts.map(acct => acct.id)
});

export const withDummyDataMin = () => {
  const accounts = [
    dummyAccount('a1001', 'Checking', Account.Type.CHECKING),
  ];
  const banks = [
    dummyBank('b100', '1st Bank', accounts),
  ];
  return {
    ...openedDb(),
    views: {
      banks: buildDictionary(banks),
      accounts: buildDictionary(accounts)
    }
  };
};

export const withDummyDataMed = () => {
  const accounts = [
    dummyAccount('a1001', 'Checking', Account.Type.CHECKING),
    dummyAccount('a1002', 'Savings', Account.Type.SAVINGS),
    dummyAccount('a2003', 'Credit Card', Account.Type.CREDITCARD),
  ];
  const banks = [
    dummyBank('b100', '1st Bank', accounts.slice(0, 1)),
    dummyBank('b200', 'CC Company', accounts.slice(2, 3)),
  ];
  return {
    ...openedDb(),
    views: {
      banks: buildDictionary(banks),
      accounts: buildDictionary(accounts)
    }
  };
};

export const withDummyDataMax = () => {
  const accounts = [
    dummyAccount('a1001', 'Checking', Account.Type.CHECKING),
    dummyAccount('a1002', 'Savings', Account.Type.SAVINGS),
    dummyAccount('a1003', 'Credit Card', Account.Type.CREDITCARD),
    dummyAccount('a2001', 'Credit Card', Account.Type.CREDITCARD),
    dummyAccount('a3001', 'Credit Card', Account.Type.CREDITCARD),
    dummyAccount('a4001', 'Credit Card', Account.Type.CREDITCARD),
    dummyAccount('a5001', 'Checking', Account.Type.CHECKING),
    dummyAccount('a5002', 'Savings', Account.Type.SAVINGS),
    dummyAccount('a5003', 'Credit Card', Account.Type.CREDITCARD),
  ];
  const banks = [
    dummyBank('b100', '1st Bank', accounts.slice(0, 2)),
    dummyBank('b200', 'CC A', accounts.slice(3, 4)),
    dummyBank('b300', 'CC B', accounts.slice(4, 5)),
    dummyBank('b400', 'CC C', accounts.slice(5, 6)),
    dummyBank('b500', '2nd Bank', accounts.slice(6, 9)),
  ];
  return {
    ...openedDb(),
    views: {
      banks: buildDictionary(banks),
      accounts: buildDictionary(accounts)
    }
  };
};

export const preloadedStore = (state: Partial<RootState> = {}) => {
  const preloadedState: RootState = {
    ping: { isPinging: false },
    ...initDbs([]),
    fi: { list: filist },
    router: { location: null },
    views: {
      banks: {},
      accounts: {},
    },
    ...state
  };

  const mockStore = configureMockStore([dispatchActionLogger, thunk.withExtraArgument(dependencies)]);
  return mockStore(preloadedState);
};
