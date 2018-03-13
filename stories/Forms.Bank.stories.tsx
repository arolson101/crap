import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BankFormComponent } from '../src/components/forms/BankForm';
import { Bank } from '../src/state';
import { filist } from './storeHelpers';

const props = {
  filist,
  banks: [] as Bank[],
  bankCreate: action('bankCreate'),
  bankUpdate: action('bankUpdate'),
};

const bank: Bank = {
  id: '123' as Bank.Id,
  _deleted: 0,
  name: '1st Source Bank',
  web: 'http://www.1stbank.com',
  address: '123 Anywhere St\nAnytown, USA',
  notes: 'member since 1999',
  online: true,
  fid: '54321',
  org: '1ST',
  ofx: 'https://ofx.1stbank.com',
  username: 'anyone',
  password: 'secret!',
  accounts: [],
};

storiesOf('Forms/Bank', module)
  .add('Create', () => (
    <BankFormComponent
      {...props}
    />
  ))
  .add('Edit (online)', () => (
    <BankFormComponent
      {...props}
      edit={bank}
    />
  ))
  .add('Edit (offline)', () => (
    <BankFormComponent
      {...props}
      edit={{...bank, online: false}}
    />
  ))
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
