import * as React from 'react';
import { Form } from 'react-form';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { TextField, SelectField, SubmitButton, SubmitErrorDisplay, formStyles } from '../components';
import { List, ListItem } from 'react-native-elements';
import messages from './LoginForm.messages';

interface FormValues {
  dbName: string;
  password: string;
  submitError?: string;
}

interface Props {
  dbs: string[];
  dbOpen: (dbName: string, password: string) => any;
  linkDbAdvanced: (dbName: string) => any;
  initialValues?: Partial<FormValues>;
}

export namespace LoginFormOpen {
  export type Values = FormValues;
}

export const LoginFormOpen: React.ComponentType<Props> = injectIntl(
  ({ dbs, dbOpen, linkDbAdvanced, initialValues, intl: { formatMessage } }: Props & InjectedIntlProps) => {
    const items = dbs.map(db => ({ value: db, label: db }));
    const defaultValues: FormValues = {
      dbName: dbs[0],
      password: '',
      ...initialValues,
    };

    return (
      <Form
        defaultValues={defaultValues}
        validateError={(values: FormValues) => ({
          password: !values.password.trim() ? formatMessage(messages.valueEmpty)
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
            <SelectField
              field="dbName"
              label={messages.dbNameLabel}
              items={items}
            />
            <TextField
              secure
              field="password"
              label={messages.passwordLabel}
              placeholder={messages.passwordPlaceholder}
            />
            <ListItem
              wrapperStyle={formStyles.wrapperStyle}
              title={formatMessage(messages.advanced)}
              onPress={() => linkDbAdvanced((formApi.values as FormValues).dbName)}
            />
            <SubmitErrorDisplay field="submitError" />
            <SubmitButton
              onPress={formApi.submitForm}
              title={messages.open}
            />
          </List>
        }
      </Form>
    );
  }
);
