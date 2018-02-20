import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BankFormComponent } from '../src/components/forms/BankForm';
import { Bank } from '../src/state';

const props = {
  banks: [] as Bank[],
  bankCreate: action('bankCreate'),
  bankUpdate: action('bankUpdate'),
};

storiesOf('Forms/Bank', module)
  .add('Create', () => (
    <BankFormComponent
      {...props}
    />
  ))
  // .add('Open (single choice)', () => (
  //   <BankFormComponent
  //     {...props}
  //   />
  // ))
  // .add('Open (multiple choices)', () => (
  //   <BankFormComponent
  //     {...props}
  //     dbs={['first', 'second', 'third']}
  //   />
  // ))
  // .add('Login failed', () => (
  //   <BankFormComponent
  //     {...props}
  //     initialValues={{
  //       dbName: 'gonna fail',
  //       password: 'password',
  //       passwordConfirm: 'password',
  //     }}
  //     dbOpenError={new Error(`dbOpen failed!`)}
  //   />
  // ))
  // .add('Initial Values', () => (
  //   <BankFormComponent
  //     {...props}
  //     initialValues={{
  //       dbName: 'storied database',
  //       password: 'asdf',
  //       passwordConfirm: 'asdf',
  //     }}
  //   />
  // ))
  ;
