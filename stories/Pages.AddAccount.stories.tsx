import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { AddAccountPageComponent } from '../src/components/pages/AddAccountPage';
import { configureStore } from '../src/state';
import { dependencies, middlewares } from './storeHelpers';

const store = configureStore(dependencies, middlewares);

const props = {
  banks: [],
};

storiesOf('Pages/AddAccount', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('No banks', () => (
    <AddAccountPageComponent
      {...props}
    />
  ))
  .add('Banks', () => (
    <AddAccountPageComponent
      {...props}
    />
  ))
  ;
