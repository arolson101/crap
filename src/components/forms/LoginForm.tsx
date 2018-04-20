import * as React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { View } from 'react-native';
import { ButtonGroup, ListItem } from 'react-native-elements';
import { compose } from 'recompose';
import { Queries, Mutations } from '../../db';
import { nav } from '../../nav';
import { ctx } from '../ctx';
import { typedFields } from './fields';

interface Props {
  initialValues?: Partial<FormValues>;
  query: Queries.Dbs;
  openDb: Mutations.OpenDb;
}

interface FormValues {
  name: string;
  password: string;
  passwordConfirm: string;
}

const enum Mode {
  CreateNew,
  OpenExisting,
}

interface State {
  mode: Mode;
}

const buttons = [
  { element: () => <FormattedMessage {...messages.create} /> },
  { element: () => <FormattedMessage {...messages.open} /> },
];

const {
  Form,
  ErrorMessage,
  SelectField,
  SubmitButton,
  TextField,
} = typedFields<FormValues>();

export class LoginFormComponent extends React.PureComponent<Props, State> {
  state = {
    mode: Mode.OpenExisting,
  };

  render() {
    if (this.props.query.loading) {
      return null;
    }

    if (this.props.query.error) {
      return <ErrorMessage error={this.props.query.error} />;
    }

    const mode = this.props.query.data.dbs.length ? this.state.mode : Mode.CreateNew;
    return (
      <>
        <ButtonGroup
          onPress={selectedIndex => this.setState({ mode: selectedIndex })}
          buttons={buttons}
          selectedIndex={mode}
          selectedIndexes={[mode]}
          disableSelected
        />

        {mode === Mode.CreateNew
          ? <FormCreate {...this.props}/>
          : <FormOpen {...this.props}/>
        }
      </>
    );
  }
}

export const LoginForm = compose(
  Queries.withDbs('query'),
  Mutations.withOpenDb('openDb'),
)(LoginFormComponent);
LoginForm.displayName = 'LoginForm';

const FormCreate: React.SFC<Props> = (props, context: ctx.Intl) => {
  const { intl: { formatMessage } } = context;

  return (
    <Form
      defaultValues={{
        name: '',
        password: '',
        passwordConfirm: '',
        ...props.initialValues,
      }}
      validateError={values => ({
        name: !values.name.trim() ? formatMessage(messages.valueEmpty)
          : props.query.data.dbs.includes(values.name.trim()) ? formatMessage(messages.dbExists)
            : undefined,
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
        passwordConfirm: (values.password !== values.passwordConfirm) ? formatMessage(messages.passwordsMatch)
          : undefined,
      })}
      onSubmit={variables => {
        return props.openDb.execute({ variables });
      }}
    >
      {formApi =>
        <View>
          <TextField
            field="name"
            label={messages.nameLabel}
            placeholder={messages.namePlaceholder}
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
          <ErrorMessage error={props.openDb.error} />
          <SubmitButton
            disabled={props.openDb.loading}
            onPress={formApi.submitForm}
            title={messages.create}
          />
        </View>
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
        name: props.query.data.dbs[0],
        password: '',
        ...props.initialValues,
      }}
      // validateError={values => ({
      //   password: !values.password.trim() ? formatMessage(messages.valueEmpty)
      //     : undefined,
      // })}
      onSubmit={async variables => {
        try {
          await props.openDb.execute({ variables });
        } catch (err) {
          console.warn(err);
        }
      }}
    >
      {formApi =>
        <View>
          <SelectField
            field="name"
            label={messages.nameLabel}
            items={props.query.data.dbs.map(db => ({ value: db, label: db }))}
          />
          <TextField
            secure
            autoFocus
            field="password"
            label={messages.passwordLabel}
            placeholder={messages.passwordPlaceholder}
          />
          <ListItem
            // wrapperStyle={formStyles.wrapperStyle}
            title={formatMessage(messages.advanced)}
            onPress={() => push(nav.dbAdvanced(formApi.values.name))}
          />
          <ErrorMessage error={props.openDb.error} />
          <SubmitButton
            disabled={props.openDb.loading}
            onPress={formApi.submitForm}
            title={messages.open}
          />
        </View>
      }
    </Form>
  );
};
FormOpen.contextTypes = { ...ctx.intl, ...ctx.router };

const messages = defineMessages({
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
  nameLabel: {
    id: 'LoginForm.nameLabel',
    defaultMessage: 'Database Name'
  },
  namePlaceholder: {
    id: 'LoginForm.namePlaceholder',
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
