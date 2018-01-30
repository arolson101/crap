import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore, actions } from '../src/state';
import { LoginForm } from '../src/components/forms/LoginForm';
import { middlewares, dependencies } from './storeHelpers';

const store = configureStore(dependencies, middlewares);
store.dispatch(actions.dbSetAvailableDbs(['first', 'second', 'third']));

storiesOf('Forms', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Login', () => <LoginForm onSubmit={action('submit')}/>);
