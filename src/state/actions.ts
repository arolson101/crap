import { getReturnOfExpression } from 'react-redux-typescript';
import * as RRR from 'react-router-redux';
import { createAction } from 'typesafe-actions';
import { Bank, Account } from '../db';
import { thunks } from './thunks';
import { FI } from './reducers/fi';

const actionCreators = {
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

  account: {
    create: '/accounts/create/:bankId?',
    view: '/accounts/:accountId',
    update: '/accounts/update/:bankId/:accountId?',
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
  accountView: (bankId: Bank.Id, accountId: Account.Id) =>
    paths.account.view.replace(':accountId', accountId),
  accountUpdate: (bankId: Bank.Id, accountId: Account.Id) =>
    paths.account.update.replace(':bankId', bankId).replace(':accountId?', accountId),
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
