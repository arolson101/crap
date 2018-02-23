import * as React from 'react';
import { Form } from 'react-form';
import { FormattedMessage, defineMessages } from 'react-intl';
import { ButtonGroup, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, actions, nav, selectors } from '../../state';
import { ctx } from '../ctx';
import { SelectField, TextField, SubmitButton, ErrorMessage, formStyles } from './fields';

interface Props {
  dbs: string[];
  dbOpenError: Error | undefined;
  dbOpen: (dbName: string, password: string) => any;
  initialValues?: Partial<FormValues>;
}

interface FormValues {
  dbName: string;
  password: string;
  passwordConfirm: string;
}

const enum Mode {
  OpenExisting,
  CreateNew,
}

interface State {
  mode: Mode;
}

const buttons = [
  { element: () => <FormattedMessage {...messages.open} /> },
  { element: () => <FormattedMessage {...messages.create} /> },
];

export class LoginFormComponent extends React.PureComponent<Props, State> {
  state = {
    mode: Mode.OpenExisting,
  };

  render() {
    const mode = this.props.dbs.length ? this.state.mode : Mode.CreateNew;
    return (
      <>
        <ButtonGroup
          onPress={selectedIndex => this.setState({mode: selectedIndex})}
          buttons={buttons}
          selectedIndex={mode}
          selectedIndexes={[mode]}
          disableSelected
        />

        {mode === Mode.CreateNew
          ? <FormCreate {...this.props} />
          : <FormOpen {...this.props} />
        }
      </>
    );
  }
}

export const LoginForm = connect(
  (state: RootState) => ({
    dbs: selectors.getDbs(state),
    dbOpenError: selectors.getDbOpenError(state),
  }),
  {
    dbOpen: actions.dbOpen,
  }
)(LoginFormComponent);
LoginForm.displayName = 'LoginForm';

const FormCreate: React.SFC<Props> = (props, context: ctx.Intl) => {
  const { intl: { formatMessage } } = context;

  return (
    <Form
      defaultValues={{
        dbName: '',
        password: '',
        passwordConfirm: '',
        ...props.initialValues,
      } as FormValues}
      validateError={(values: FormValues) => ({
        dbName: !values.dbName.trim() ? formatMessage(messages.valueEmpty)
          : props.dbs.includes(values.dbName.trim()) ? formatMessage(messages.dbExists)
            : undefined,
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
        passwordConfirm: (values.password !== values.passwordConfirm) ? formatMessage(messages.passwordsMatch)
          : undefined,
      })}
      onSubmit={(values: FormValues) => {
        return props.dbOpen(values.dbName, values.password);
      }}
    >
      {formApi =>
        <List>
          <TextField
            field="dbName"
            label={messages.dbNameLabel}
            placeholder={messages.dbNamePlaceholder}
            autoFocus
          />
          <TextField
            secure
            field="password"
            label={messages.passwordLabel}
            placeholder={messages.passwordPlaceholder}
          />
          <TextField
            secure
            field="passwordConfirm"
            label={messages.passwordConfirmLabel}
            placeholder={messages.passwordConfirmPlaceholder}
          />
          <ErrorMessage error={props.dbOpenError} />
          <SubmitButton
            onPress={formApi.submitForm}
            title={messages.create}
          />
        </List>
      }
    </Form>
  );
};
FormCreate.contextTypes = ctx.intl;

const FormOpen: React.SFC<Props> = (props, context: ctx.Router & ctx.Intl) => {
  const { intl: { formatMessage } } = context;
  const { router: { history: { push } } } = context;

  return (
    <Form
      defaultValues={{
        dbName: props.dbs[0],
        password: '',
        ...props.initialValues,
      }}
      validateError={(values: FormValues) => ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={(values: FormValues) => {
        return props.dbOpen(values.dbName, values.password);
      }}
    >
      {formApi =>
        <List>
          <SelectField
            field="dbName"
            label={messages.dbNameLabel}
            items={props.dbs.map(db => ({ value: db, label: db }))}
          />
          <TextField
            secure
            autoFocus
            field="password"
            label={messages.passwordLabel}
            placeholder={messages.passwordPlaceholder}
          />
          <ListItem
            wrapperStyle={formStyles.wrapperStyle}
            title={formatMessage(messages.advanced)}
            onPress={() => push(nav.dbAdvanced((formApi.values as FormValues).dbName))}
          />
          <ErrorMessage error={props.dbOpenError} />
          <SubmitButton
            onPress={formApi.submitForm}
            title={messages.open}
          />
        </List>
      }
    </Form>
  );
};
FormOpen.contextTypes = { ...ctx.intl, ...ctx.router };

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
