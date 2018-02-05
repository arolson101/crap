import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore, actions } from '../src/state';
import { LoginFormComponent } from '../src/forms/LoginForm';
import { middlewares, dependencies } from './storeHelpers';

storiesOf('Forms/Login', module)
  .add('Create', () =>
    <LoginFormComponent dbs={[]} onSubmit={action('submit')}/>
  )
  .add('Open (single choice)', () =>
    <LoginFormComponent dbs={['first']} onSubmit={action('submit')}/>
  )
  .add('Open (multiple choices)', () =>
    <LoginFormComponent dbs={['first', 'second', 'third']} onSubmit={action('submit')}/>
  )
  ;
