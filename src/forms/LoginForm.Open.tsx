import * as React from 'react';
import { Form } from 'react-form';
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

export const LoginFormOpen: React.SFC<Props> = ({ dbs, dbOpen, linkDbAdvanced, initialValues }) => {
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
        password: !values.password.trim() ? 'required' : undefined,
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
          <SelectField field="dbName" label="database:" items={items} />
          <TextField secure field="password" label="password:" placeholder="required" />
          <ListItem
            wrapperStyle={formStyles.wrapperStyle}
            title="advanced"
            onPress={() => linkDbAdvanced((formApi.values as FormValues).dbName)}
          />
          <SubmitErrorDisplay field="submitError"/>
          <SubmitButton
            onPress={formApi.submitForm as any}
            title={messages.open.defaultMessage}
          />
        </List>
      }
    </Form>
  );
};
