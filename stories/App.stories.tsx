import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { configureStore, Bank, nav } from '../src/state';
import { App } from '../src/components';
import {
  dependencies, preloadedStore, initialDbs,
  openedDb, withDummyDataMin, withDummyDataMed, withDummyDataMax
} from './storeHelpers';

storiesOf('Login', module)
  .add('no dbs', () => (
    <Provider store={preloadedStore({})}>
      <App />
    </Provider>
  ))
  .add('no dbs (failure)', () => (
    <Provider store={preloadedStore(initialDbs([], new Error('error opening db')))}>
      <App />
    </Provider>
  ))
  .add('1 db', () => (
    <Provider store={preloadedStore(initialDbs(['db1']))}>
      <App />
    </Provider>
  ))
  .add('1 db (failure)', () => (
    <Provider store={preloadedStore(initialDbs(['db1'], new Error('error opening db')))}>
      <App />
    </Provider>
  ))
  .add('multiple dbs', () => (
    <Provider store={preloadedStore(initialDbs(['db1', 'db2', 'db3']))}>
      <App />
    </Provider>
  ))
  ;

const Router: React.SFC<{ pathname: string }> = ({ pathname, children }) => (
  <StaticRouter location={{ pathname }} context={{}}>
    {children}
  </StaticRouter>
);

storiesOf('App', module)
  .addDecorator(story => <Provider store={preloadedStore(openedDb())}>{story()}</Provider>)
  .add('/', () => (
    <Router pathname={nav.home()}>
      <App />
    </Router>
  ))
  .add('/budgets', () => (
    <Router pathname={nav.budgets()}>
      <App />
    </Router>
  ))
  ;

const accountsMin = withDummyDataMin();
const accountsMed = withDummyDataMed();
const accountsMax = withDummyDataMax();

storiesOf('App/Accounts', module)
  .add('accounts (none)', () => (
    <Provider store={preloadedStore(openedDb())}>
      <Router pathname={nav.accounts()}>
        <App />
      </Router>
    </Provider>
  ))
  .add('accounts (min)', () => (
    <Provider store={preloadedStore(accountsMin)}>
      <Router pathname={nav.accounts()}>
        <App />
      </Router>
    </Provider>
  ))
  .add('accounts (med)', () => (
    <Provider store={preloadedStore(accountsMed)}>
      <Router pathname={nav.accounts()}>
        <App />
      </Router>
    </Provider>
  ))
  .add('accounts (max)', () => (
    <Provider store={preloadedStore(accountsMax)}>
      <Router pathname={nav.accounts()}>
        <App />
      </Router>
    </Provider>
  ))
  .add('create bank', () => (
    <Provider store={preloadedStore(accountsMed)}>
      <Router pathname={nav.bankCreate()}>
        <App />
      </Router>
    </Provider>
  ))
  .add('edit bank', () => (
    <Provider store={preloadedStore(accountsMed)}>
      <Router pathname={nav.bankUpdate(Object.keys(accountsMed.views.banks)[0] as Bank.Id)}>
        <App />
      </Router>
    </Provider>
  ))
  .add('create account', () => (
    <Provider store={preloadedStore(accountsMed)}>
      <Router pathname={nav.accountCreate(Object.keys(accountsMed.views.banks)[0] as Bank.Id)}>
        <App />
      </Router>
    </Provider>
  ))
  // .add('edit account', () => (
  //   <Provider store={preloadedStore(accountsMed)}>
  //     <Router
  //       pathname={nav.accountUpdate(
  //         Object.values(accountsMed.views.banks)[0].id,
  //         Object.values(accountsMed.views.banks)[0].accounts[0]
  //       )}
  //     >
  //       <App />
  //     </Router>
  //   </Provider>
  // ))
  ;
