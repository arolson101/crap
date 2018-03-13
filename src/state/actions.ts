import { getReturnOfExpression } from 'react-redux-typescript';
import { createAction } from 'typesafe-actions';
import { AppDatabase, TableName } from './AppDatabase';
import { Record } from './Record';
import { Bank, Account } from './records';
import { thunks } from './thunks';
import { FI } from './reducers/fi';

const actionCreators = {
  ping: createAction('ping/PING'),
  pong: createAction('ping/PONG'),

  dbSetAvailableDbs: createAction('db/SET_AVAILABLE_DBS', (dbs: string[]) => ({
    type: 'db/SET_AVAILABLE_DBS', dbs
  })),

  dbOpenBegin: createAction('db/DB_OPEN_BEGIN'),
  dbOpenSuccess: createAction('db/DB_OPEN_SUCCESS', (db: AppDatabase) => ({
    type: 'db/DB_OPEN_SUCCESS', db
  })),
  dbOpenFailure: createAction('db/DB_OPEN_FAILURE', (err: Error) => ({
    type: 'db/DB_OPEN_FAILURE', err
  })),

  recordsUpdated: createAction('views/RECORDS_UPDATED', (table: TableName, records: Record<any>[]) => ({
    type: 'views/RECORDS_UPDATED', table, records
  })),
  recordsDeleted: createAction('views/RECORDS_DELETED', (table: TableName, ids: string[]) => ({
    type: 'views/RECORDS_DELETED', table, ids
  })),

  setFi: createAction('fi/SET', (fi: FI[]) => ({
    type: 'fi/SET', fi
  })),

};

export const paths = {
  root: {
    home: '/',
    accounts: '/accounts',
    budgets: '/budgets',
  },

  accounts: {
    newBankId: 'new' as 'new',
    create: '/accounts/create/:bankId',
    accountView: 'accounts/create/:bankId/:accountId',
  },

  dbAdvanced: '/db/:dbName',
  bank: '/accounts/:bankId',
  bankUpdate: '/accounts/:bankId/update',
  accountUpdate: '/accounts/:bankId/:accountId/update',
};

export const nav = {
  dbAdvanced: (dbName: string) => paths.dbAdvanced.replace(':dbName', dbName),
  home: () => paths.root.home,
  budgets: () => paths.root.budgets,
  accounts: () => paths.root.accounts,
  bankCreate: () => paths.accounts.create.replace(':bankId', paths.accounts.newBankId),
  bank: (bankId: Bank.Id) => paths.bank.replace(':bankId', bankId),
  bankUpdate: (bankId: Bank.Id) => paths.bankUpdate.replace(':bankId', bankId),
  accountCreate: (bankId: Bank.Id) => paths.accounts.create.replace(':bankId', bankId),
  accountView: (bankId: Bank.Id, accountId: Account.Id) =>
    paths.accounts.accountView.replace(':bankId', bankId).replace(':accountId', accountId),
  accountUpdate: (bankId: Bank.Id, accountId: Account.Id) =>
    paths.accountUpdate.replace(':bankId', bankId).replace(':accountId', accountId),
};

export const actions = {
  ...actionCreators,
  ...thunks,
};

const returnOfActions = Object.values(actionCreators).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;
