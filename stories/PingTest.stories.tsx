import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../src/state';
import { PingTest } from '../src/components';
import { middlewares, dependencies } from './storeHelpers';

const store = configureStore(dependencies, middlewares);

storiesOf('Test', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('PingTest', () => <PingTest />);
