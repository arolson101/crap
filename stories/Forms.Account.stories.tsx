import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountFormComponent } from '../src/components/forms/AccountForm';
import { Bank, Account } from '../src/state';

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

const props = {
  bankId: bank.id,
  saving: false,
  accounts: [],
  accountUpdate: action('accountUpdate'),
  accountCreate: action('accountCreate'),
};

const account: Account = {
  id: '123' as Account.Id,
  _deleted: 0,
  name: '1st checking',
  color: 'red',
  type: Account.Type.CHECKING,
  number: '1234',
  visible: true,
  bankid: 'asdf',
  key: '',
};

storiesOf('Forms/Account', module)
  .add('Create', () => (
    <AccountFormComponent
      {...props}
    />
  ))
  .add('Create (saving)', () => (
    <AccountFormComponent
      {...props}
      saving
    />
  ))
  .add('Edit', () => (
    <AccountFormComponent
      {...props}
      edit={account}
    />
  ))
  .add('Edit (saving)', () => (
    <AccountFormComponent
      {...props}
      edit={account}
      saving
    />
  ))
  ;
