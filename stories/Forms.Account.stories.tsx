// import { action } from '@storybook/addon-actions';
// // import { storiesOf } from '@storybook/react';
// // import * as React from 'react';
// // import { AccountFormComponent } from '../src/forms/AccountForm';
// import { Bank, Account } from '../src/db';

// const bank: Bank = {
//   id: '123',
//   _deleted: 0,
//   name: '1st Source Bank',
//   web: 'http://www.1stbank.com',
//   favicon: '',
//   address: '123 Anywhere St\nAnytown, USA',
//   notes: 'member since 1999',
//   online: true,
//   fid: '54321',
//   org: '1ST',
//   ofx: 'https://ofx.1stbank.com',
//   username: 'anyone',
//   password: 'secret!',
// };

// const props = {
//   bankId: bank.id,
//   saving: false,
//   accounts: [],
//   accountUpdate: action('accountUpdate'),
//   accountCreate: action('accountCreate'),
// };

// const account: Account = {
//   id: '123',
//   bankId: 'asdf',
//   _deleted: 0,
//   name: '1st checking',
//   color: 'red',
//   type: Account.Type.CHECKING,
//   number: '1234',
//   routing: 'asdf',
//   visible: true,
//   key: '',
// };

// // storiesOf('Forms/Account', module)
// //   .add('Create', () => (
// //     <AccountFormComponent
// //       {...props}
// //     />
// //   ))
// //   .add('Create (saving)', () => (
// //     <AccountFormComponent
// //       {...props}
// //       saving
// //     />
// //   ))
// //   .add('Edit', () => (
// //     <AccountFormComponent
// //       {...props}
// //       edit={account}
// //     />
// //   ))
// //   .add('Edit (saving)', () => (
// //     <AccountFormComponent
// //       {...props}
// //       edit={account}
// //       saving
// //     />
// //   ))
// //   ;
