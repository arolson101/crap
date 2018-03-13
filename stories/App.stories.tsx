import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { configureStore } from '../src/state';
import { App } from '../src/components';
import { dependencies, middlewares, preloadedStore, initDbs, openedDb, withBank } from './storeHelpers';

storiesOf('Login', module)
  .add('no dbs', () => (
    <Provider store={preloadedStore({})}>
      <App />
    </Provider>
  ))
  .add('1 db', () => (
    <Provider store={preloadedStore(initDbs(['db1']))}>
      <App />
    </Provider>
  ))
  .add('multiple dbs', () => (
    <Provider store={preloadedStore(initDbs(['db1', 'db2', 'db3']))}>
      <App />
    </Provider>
  ))
  ;

storiesOf('App', module)
  .addDecorator(story => <Provider store={preloadedStore(openedDb())}>{story()}</Provider>)
  .add('/', () => (
    <StaticRouter location={{ pathname: '/' }} context={{}}>
      <App />
    </StaticRouter>
  ))
  .add('/budgets', () => (
    <StaticRouter location={{ pathname: '/budgets' }} context={{}}>
      <App />
    </StaticRouter>
  ))
  ;

storiesOf('App/Accounts', module)
  .add('accounts', () => (
    <Provider store={preloadedStore(openedDb())}>
      <StaticRouter location={{ pathname: '/accounts' }} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  ))
  .add('create bank', () => (
    <Provider store={preloadedStore(openedDb())}>
      <StaticRouter location={{ pathname: '/accounts/create' }} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  ))
  .add('create account', () => (
    <Provider store={preloadedStore(withBank('1st bank', '123', 1))}>
      <StaticRouter location={{ pathname: '/accounts/create/123' }} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  ))
  ;
