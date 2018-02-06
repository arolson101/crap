import * as React from 'react';
import { Form } from 'react-form';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { List } from 'react-native-elements';
import { TextField, SubmitButton, SubmitErrorDisplay } from '../components';
import messages from './LoginForm.messages';

interface FormValues {
  dbName: string;
  password: string;
  passwordConfirm: string;
  submitError?: string;
}

interface Props {
  dbs: string[];
  dbOpen: (dbName: string, password: string) => any;
  initialValues?: Partial<FormValues>;
}

export namespace LoginFormCreate {
  export type Values = FormValues;
}

export const LoginFormCreate: React.ComponentType<Props> = injectIntl(
  ({ dbs, dbOpen, initialValues, intl: { formatMessage } }: Props & InjectedIntlProps) => {
    const defaultValues: FormValues = {
      dbName: '',
      password: '',
      passwordConfirm: '',
      ...initialValues,
    };

    return (
      <Form
        defaultValues={defaultValues}
        validateError={(values: FormValues) => ({
          dbName: !values.dbName.trim() ? formatMessage(messages.valueEmpty)
            : dbs.includes(values.dbName.trim()) ? formatMessage(messages.dbExists)
              : undefined,
          password: !values.password.trim() ? formatMessage(messages.valueEmpty)
            : undefined,
          passwordConfirm: (values.password !== values.passwordConfirm) ? formatMessage(messages.passwordsMatch)
            : undefined,
        })}
        onSubmit={(values: FormValues, e, formApi) => {
          formApi.setValue('submitError', undefined);
          return dbOpen(values.dbName, values.password);
        }}
        onSubmitFailure={(errors, formApi, error) => {
          if (error) {
            formApi.setValue('submitError', error.message);
          }
        }}
      >
        {formApi =>
          <List>
            <TextField
              field="dbName"
              label={messages.dbNameLabel}
              placeholder={messages.dbNamePlaceholder}
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
            <SubmitErrorDisplay field="submitError" />
            <SubmitButton
              onPress={formApi.submitForm}
              title={messages.create}
            />
          </List>
        }
      </Form>
    );
  });