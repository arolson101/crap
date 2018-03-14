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

const types: Account.Type[] = [
  Account.Type.CHECKING,
  Account.Type.SAVINGS,
  Account.Type.CREDITCARD,
];

const dummyBankAndAccounts = (id: number, name: string, numAccounts: number, type?: Account.Type) => {
  const accounts = Array.from(Array(numAccounts)).map(
    (x, idx) => dummyAccount(
      `acct${id}_${idx}`,
      `${name} ${type ? type : types[idx % types.length]}`,
      type ? type : types[idx % types.length]
    )
  );

  const bank = dummyBank(`bnk${id}`, name, accounts);
  return {bank, accounts};
};

export const withDummyDataMin = () => {
  const accounts: Account[] = [];
  const banks: Bank[] = [];
  [
    dummyBankAndAccounts(1, '1st Bank', 1),
    dummyBankAndAccounts(2, 'CC Company', 1, Account.Type.CREDITCARD),
  ].forEach(a => {
    accounts.push(...a.accounts);
    banks.push(a.bank);
  });

  return {
    ...openedDb(),
    views: {
      banks: buildDictionary(banks),
      accounts: buildDictionary(accounts)
    }
  };
};

export const withDummyDataMed = () => {
  const accounts: Account[] = [];
  const banks: Bank[] = [];
  [
    dummyBankAndAccounts(1, '1st Bank', 3),
    dummyBankAndAccounts(2, 'CC Company', 1, Account.Type.CREDITCARD),
    dummyBankAndAccounts(3, 'CC Other', 1, Account.Type.CREDITCARD),
  ].forEach(a => {
    accounts.push(...a.accounts);
    banks.push(a.bank);
  });

  return {
    ...openedDb(),
    views: {
      banks: buildDictionary(banks),
      accounts: buildDictionary(accounts)
    }
  };
};

export const withDummyDataMax = () => {
  const accounts: Account[] = [];
  const banks: Bank[] = [];
  Array.from(Array(10))
  .map((x, idx) => dummyBankAndAccounts(idx, `${idx + 1}st Bank`, 5))
  .forEach(a => {
    accounts.push(...a.accounts);
    banks.push(a.bank);
  });

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
