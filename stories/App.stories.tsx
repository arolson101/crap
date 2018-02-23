import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../src/state';
import { AppComponent } from '../src/components';
import { dependencies, middlewares } from './storeHelpers';

const store = configureStore(dependencies, middlewares);

storiesOf('App', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('not open', () => <AppComponent/>)
  .add('open', () => <AppComponent isOpen/>)
  ;
