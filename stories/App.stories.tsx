import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { configureStore } from '../src/state';
import { AppComponent } from '../src/components';
import { dependencies, middlewares } from './storeHelpers';

const store = configureStore(dependencies, middlewares);

storiesOf('App/Login', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('no dbs', () => <AppComponent />)
  .add('1 dbs', () => <AppComponent />)
  ;

storiesOf('App/Pages', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('home', () => (
    <StaticRouter location={{ pathname: '/' }} context={{}}>
      <AppComponent isOpen />
    </StaticRouter>
  ))
  .add('budgets', () => (
    <StaticRouter location={{ pathname: '/budgets' }} context={{}}>
      <AppComponent isOpen />
    </StaticRouter>
  ))
  .add('accounts', () => (
    <StaticRouter location={{ pathname: '/accounts' }} context={{}}>
      <AppComponent isOpen />
    </StaticRouter>
  ))
  ;
