import * as React from 'react';
import { Form } from 'react-form';
import { List } from 'react-native-elements';
import { TextField, SubmitButton } from '../components';
import messages from './LoginForm.messages';

interface FormValues {
  dbName: string;
  password: string;
  passwordConfirm: string;
  submitError?: string;
}

const defaultValues: FormValues = {
  dbName: '',
  password: '',
  passwordConfirm: '',
};

interface Props {
  dbs: string[];
  dbOpen: (dbName: string, password: string) => any;
}

export const LoginFormCreate: React.SFC<Props> = ({dbs, dbOpen}) => {
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(values: FormValues, e, formApi) => {
        if (values.password !== values.passwordConfirm) {
          throw new Error('passwords must match');
        }

        return dbOpen(values.dbName, values.password);
      }}
    >
      {formApi =>
        <List>
          <TextField field="dbName" label="database:" placeholder="my database" />
          <TextField secure field="password" label="password:" placeholder="required" />
          <TextField secure field="confirmPassword" label="confirm password:" placeholder="required" />
          <SubmitButton
            onPress={formApi.submitForm as any}
            title={messages.create.defaultMessage}
          />
        </List>
      }
    </Form>
  );
};
