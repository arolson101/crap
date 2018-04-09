import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { AccountsCreatePage } from '../src/components/pages/AccountsCreatePage';
import { preloadedStore } from './storeHelpers';

const store = preloadedStore();

const props = {
  banks: [],
};

storiesOf('Pages/AddAccount', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('No banks', () => (
    <AccountsCreatePage
      {...props}
    />
  ))
  .add('Banks', () => (
    <AccountsCreatePage
      {...props}
    />
  ))
  ;
