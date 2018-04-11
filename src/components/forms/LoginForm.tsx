import * as React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { View } from 'react-native';
import { ButtonGroup, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, actions, nav, selectors } from '../../state';
import { ctx } from '../ctx';
import { typedFields, SelectFieldItem, formStyles } from './fields';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import schema from '../../db/schema';
import { execute } from 'graphql';
import Observable from 'zen-observable-ts';

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);

  return new Observable(observer => {
    const opts = {
      schema,
      document: operation.query,
      variableValues: operation.variables,
    };
    Promise.resolve(execute(opts)).then(res => {
      observer.next(res);
      observer.complete();
    });
  });
});

const client = new ApolloClient({
  link: consoleLink,
  cache: new InMemoryCache()
});

async function test() {
  const query = gql`
    query Course($id: Int!) {
      course(id: $id) {
        id
        title
        author
        description
        topic
        url
      }
    }
  `;
  const variables = {id: 1};
  client.query({query, variables}).then(res => console.log(`query result`, res));
}

test();

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
      }}
      validateError={values => ({
        dbName: !values.dbName.trim() ? formatMessage(messages.valueEmpty)
          : props.dbs.includes(values.dbName.trim()) ? formatMessage(messages.dbExists)
            : undefined,
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
        passwordConfirm: (values.password !== values.passwordConfirm) ? formatMessage(messages.passwordsMatch)
          : undefined,
      })}
      onSubmit={values => {
        return props.dbOpen(values.dbName, values.password);
      }}
    >
      {formApi =>
        <View>
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
        dbName: props.dbs[0],
        password: '',
        ...props.initialValues,
      }}
      validateError={values => ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
      })}
      onSubmit={values => {
        return props.dbOpen(values.dbName, values.password);
      }}
    >
      {formApi =>
        <View>
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
            // wrapperStyle={formStyles.wrapperStyle}
            title={formatMessage(messages.advanced)}
            onPress={() => push(nav.dbAdvanced(formApi.values.dbName))}
          />
          <ErrorMessage error={props.dbOpenError} />
          <SubmitButton
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
