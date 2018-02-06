import { defineMessages } from 'react-intl';

const messages = defineMessages({
  dbName: {
    id: 'LoginForm.dbName',
    defaultMessage: 'DB Name'
  },
  create: {
    id: 'LoginForm.create',
    defaultMessage: 'Create',
  },
  open: {
    id: 'LoginForm.open',
    defaultMessage: 'Open',
  },
  valueEmpty: {
    id: 'LoginForm.valueEmpty',
    defaultMessage: 'Cannot be empty'
  },
  dbExists: {
    id: 'LoginForm.dbExists',
    defaultMessage: 'Database already exists'
  },
  passwordsMatch: {
    id: 'LoginForm.passwordsMatch',
    defaultMessage: 'Passwords must match'
  },
  dbNameLabel: {
    id: 'LoginForm.dbNameLabel',
    defaultMessage: 'Database Name'
  },
  dbNamePlaceholder: {
    id: 'LoginForm.dbNamePlaceholder',
    defaultMessage: 'My Database'
  },
  passwordLabel: {
    id: 'LoginForm.passwordLabel',
    defaultMessage: 'Password'
  },
  passwordPlaceholder: {
    id: 'LoginForm.passwordPlaceholder',
    defaultMessage: 'Required'
  },
  passwordConfirmLabel: {
    id: 'LoginForm.passwordConfirmLabel',
    defaultMessage: 'Confirm Password'
  },
  passwordConfirmPlaceholder: {
    id: 'LoginForm.passwordConfirmPlaceholder',
    defaultMessage: 'Required'
  },
  advanced: {
    id: 'LoginForm.advanced',
    defaultMessage: 'Advanced'
  }
});

export default messages;
