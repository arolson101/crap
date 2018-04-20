import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountsCreatePage } from '../src/components/pages/AccountsCreatePage';

// const store = preloadedStore();

const props = {
  banks: [],
};

storiesOf('Pages/AddAccount', module)
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
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
