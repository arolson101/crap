import { getReturnOfExpression } from 'react-redux-typescript';
import { push } from 'react-router-redux';
import { createAction } from 'typesafe-actions';
import { AppDatabase, TableName } from './AppDatabase';
import { Record } from './Record';
import { thunks } from './thunks';

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
};

export const paths = {
  dbAdvanced: '/db/:dbName',
  home: '/',
  budgets: '/budgets',
  accounts: '/accounts',
  bank: '/bank/:bankId',
  account: '/account/:accountId',
};

export const nav = {
  dbAdvanced: (dbName: string) => paths.dbAdvanced.replace(':dbName', dbName),
  home: () => paths.home,
  budgets: () => paths.budgets,
  accounts: () => paths.accounts,
  bank: (bankId: string) => paths.bank.replace(':bankId', bankId),
  account: (accountId: string) => paths.account.replace(':accountId', accountId),
};

export const navActions = {
  navDbAdvanced: (dbName: string) => push(nav.dbAdvanced(dbName)),
  navHome: () => push(nav.home()),
  navBudgets: () => push(nav.budgets()),
  navAccounts: () => push(nav.accounts()),
  navBank: (bankId: string) => push(nav.bank(bankId)),
};

export const actions = {
  ...actionCreators,
  ...navActions,
  ...thunks,
};

const returnOfActions = Object.values(actionCreators).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;
