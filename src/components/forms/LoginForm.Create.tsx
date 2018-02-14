import * as React from 'react';
import { Form } from 'react-form';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { List } from 'react-native-elements';
import { TextField, SubmitButton, ErrorMessage } from './fields';
import messages from './LoginForm.messages';

interface FormValues {
  dbName: string;
  password: string;
  passwordConfirm: string;
}

interface Props {
  dbs: string[];
  openError: Error | undefined;
  dbOpen: (dbName: string, password: string) => any;
  initialValues?: Partial<FormValues>;
}

export namespace LoginFormCreate {
  export type Values = FormValues;
}

export const LoginFormCreate: React.ComponentType<Props> = injectIntl(
  ({ dbs, dbOpen, openError, initialValues, intl: { formatMessage } }: Props & InjectedIntlProps) => {
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
          return dbOpen(values.dbName, values.password);
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
            <ErrorMessage error={openError}/>
            <SubmitButton
              onPress={formApi.submitForm}
              title={messages.create}
            />
          </List>
        }
      </Form>
    );
  });
