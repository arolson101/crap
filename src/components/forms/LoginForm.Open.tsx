import * as React from 'react';
import { Form } from 'react-form';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { List, ListItem } from 'react-native-elements';
import { TextField, SelectField, SubmitButton, formStyles, ErrorMessage } from './fields';
import messages from './LoginForm.messages';

interface FormValues {
  dbName: string;
  password: string;
}

interface Props {
  dbs: string[];
  openError: Error | undefined;
  dbOpen: (dbName: string, password: string) => any;
  navDbAdvanced: (dbName: string) => any;
  initialValues?: Partial<FormValues>;
}

export namespace LoginFormOpen {
  export type Values = FormValues;
}

export const LoginFormOpen: React.ComponentType<Props> = injectIntl(
  ({ dbs, dbOpen, openError, navDbAdvanced, initialValues, intl: { formatMessage } }: Props & InjectedIntlProps) => {
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
          return dbOpen(values.dbName, values.password);
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
              onPress={() => navDbAdvanced((formApi.values as FormValues).dbName)}
            />
            <ErrorMessage error={openError}/>
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
