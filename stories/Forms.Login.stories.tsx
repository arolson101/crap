import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore, actions } from '../src/state';
import { LoginFormComponent } from '../src/forms/LoginForm';
import { middlewares, dependencies } from './storeHelpers';

storiesOf('Forms/Login', module)
  .add('Create', () => (
    <LoginFormComponent
      dbs={[]}
      dbOpen={action('dbOpen')}
      linkDbAdvanced={action('link')}
    />
  ))
  .add('Open (single choice)', () => (
    <LoginFormComponent
      dbs={['my database']}
      dbOpen={action('dbOpen')}
      linkDbAdvanced={action('link')}
    />
  ))
  .add('Open (multiple choices)', () => (
    <LoginFormComponent
      dbs={['first', 'second', 'third']}
      dbOpen={action('dbOpen')}
      linkDbAdvanced={action('link')}
    />
  ))
  ;
