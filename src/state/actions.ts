import { getReturnOfExpression } from 'react-redux-typescript';
import * as RRR from 'react-router-redux';
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

  bankCreating: createAction('bank/CREATING', (creating: boolean | Error) => ({
    type: 'bank/CREATING', creating
  })),
  bankUpdating: createAction('bank/UPDATING', (updating: boolean | Error) => ({
    type: 'bank/UPDATING', updating
  })),
  bankDeleting: createAction('bank/DELETING', (deleting: boolean | Error) => ({
    type: 'bank/DELETING', deleting
  })),

  accountCreating: createAction('account/CREATING', (creating: boolean | Error) => ({
    type: 'account/CREATING', creating
  })),
  accountUpdating: createAction('account/UPDATING', (updating: boolean | Error) => ({
    type: 'account/UPDATING', updating
  })),
  accountDeleting: createAction('account/DELETING', (deleting: boolean | Error) => ({
    type: 'account/DELETING', deleting
  })),
};

export const paths = {
  root: {
    home: '/',
    accounts: '/account',
    budgets: '/budgets',
  },

  account: {
    create: '/account/create/:bankId?',
    view: '/account/:accountId',
    update: '/account/update/:accountId?',
  },

  dbAdvanced: '/db/:dbName',
};

export const nav = {
  dbAdvanced: (dbName: string) => paths.dbAdvanced.replace(':dbName', dbName),
  home: () => paths.root.home,
  budgets: () => paths.root.budgets,
  accounts: () => paths.root.accounts,
  bankCreate: () =>
    paths.account.create.replace(':bankId?', ''),
  bankUpdate: (bankId: Bank.Id) =>
    paths.account.update.replace(':bankId', bankId).replace(':accountId?', ''),
  accountCreate: (bankId: Bank.Id) =>
    paths.account.create.replace(':bankId?', bankId),
  accountView: (bankId: Bank.Id | string, accountId: Account.Id | string) =>
    paths.account.view.replace(':accountId', accountId),
  accountUpdate: (accountId: Account.Id | string) =>
    paths.account.update.replace(':accountId?', accountId),
};

const history = {
  push: RRR.push,
  replace: RRR.replace,
  go: RRR.go,
  goForward: RRR.goForward,
  goBack: RRR.goBack,
};

export const actions = {
  ...actionCreators,
  ...thunks,
  history,
};

const returnOfActions = Object.values(actionCreators).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;
