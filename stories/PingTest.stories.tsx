import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../src/state';
import { PingTest } from '../src/components';

const store = configureStore({
  getTime: Date.now,
  genId: () => Date.now().toString()
});

storiesOf('Test', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('PingTest', () => <PingTest/>);
