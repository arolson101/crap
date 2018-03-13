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

export const withBank = (name: string, id: string, numAccounts: number) => {
  const accounts = Array.from(Array(numAccounts)).map((v, idx): Account => ({
    id: `${id}${idx}` as Account.Id,
    _deleted: 0,
    name: `${name} account ${idx + 1}`,
    color: '',
    type: Account.Type.CHECKING,
    number: `${id}${idx}`,
    visible: true,
    bankid: '',
    key: '',
  }));
  return {
    ...openedDb(),
    views: {
      banks: {
        [id]: {
          id: id as Bank.Id,
          _deleted: 0,
          name,
          accounts: accounts.map(acct => acct.id)
        } as Bank,
      },
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
