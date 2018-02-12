import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { LoginFormComponent } from '../src/forms/LoginForm';

const props = {
  dbs: ['storied database'],
  dbOpen: action('dbOpen'),
  navDbAdvanced: action('navDbAdvanced'),
};

let errorCount = 0;

storiesOf('Forms/Login', module)
  .add('Create', () => (
    <LoginFormComponent
      {...props}
      dbs={[]}
    />
  ))
  .add('Open (single choice)', () => (
    <LoginFormComponent
      {...props}
    />
  ))
  .add('Open (multiple choices)', () => (
    <LoginFormComponent
      {...props}
      dbs={['first', 'second', 'third']}
    />
  ))
  .add('Login fails', () => (
    <LoginFormComponent
      {...props}
      initialValuesCreate={{
        dbName: 'gonna fail',
        password: 'password',
        passwordConfirm: 'password',
      }}
      initialValuesOpen={{
        password: 'password',
      }}
      dbOpen={() => {
        throw new Error(`dbOpen failed (${errorCount++})!`);
      }}
    />
  ))
  .add('Initial Values', () => (
    <LoginFormComponent
      {...props}
      initialValuesCreate={{
        dbName: 'storied database',
        password: 'asdf',
        passwordConfirm: 'asdf',
      }}
    />
  ))
  ;
