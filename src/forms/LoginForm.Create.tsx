import * as React from 'react';
import { Form } from 'react-form';
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

export const LoginFormCreate: React.SFC<Props> = ({ dbs, dbOpen, initialValues }) => {
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
        dbName: !values.dbName.trim() ? 'required'
          : dbs.includes(values.dbName.trim()) ? 'already used'
          : undefined,
        password: !values.password.trim() ? 'required' : undefined,
        passwordConfirm: (values.password !== values.passwordConfirm) ? 'must match password' : undefined,
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
          <TextField field="dbName" label="database:" placeholder="my database" />
          <TextField secure field="password" label="password:" placeholder="required" />
          <TextField secure field="passwordConfirm" label="confirm password:" placeholder="required" />
          <SubmitErrorDisplay field="submitError" />
          <SubmitButton
            onPress={formApi.submitForm as any}
            title={messages.create.defaultMessage}
          />
        </List>
      }
    </Form>
  );
};
