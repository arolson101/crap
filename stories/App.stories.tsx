import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { configureStore, Bank, nav } from '../src/state';
import { App } from '../src/components';
import { dependencies, middlewares, preloadedStore, initDbs, openedDb, withBank } from './storeHelpers';

storiesOf('Login', module)
  .add('no dbs', () => (
    <Provider store={preloadedStore({})}>
      <App />
    </Provider>
  ))
  .add('no dbs (failure)', () => (
    <Provider store={preloadedStore(initDbs([], new Error('error opening db')))}>
      <App />
    </Provider>
  ))
  .add('1 db', () => (
    <Provider store={preloadedStore(initDbs(['db1']))}>
      <App />
    </Provider>
  ))
  .add('1 db (failure)', () => (
    <Provider store={preloadedStore(initDbs(['db1'], new Error('error opening db')))}>
      <App />
    </Provider>
  ))
  .add('multiple dbs', () => (
    <Provider store={preloadedStore(initDbs(['db1', 'db2', 'db3']))}>
      <App />
    </Provider>
  ))
  ;

const Router: React.SFC<{pathname: string}> = ({pathname, children}) => (
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

storiesOf('App/Accounts', module)
  .addDecorator(story => <Provider store={preloadedStore(withBank('1st bank', '123', 1))}>{story()}</Provider>)
  .add('accounts', () => (
    <Router pathname={nav.accounts()}>
      <App />
    </Router>
  ))
  .add('create bank', () => (
    <Router pathname={nav.bankCreate()}>
      <App />
    </Router>
  ))
  .add('create account', () => (
    <Router pathname={nav.accountCreate('123' as Bank.Id)}>
      <App />
    </Router>
  ))
  ;
