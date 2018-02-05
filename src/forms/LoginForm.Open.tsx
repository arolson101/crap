import * as React from 'react';
import { Form } from 'react-form';
import { TextField, SelectField, SubmitButton, formStyles } from '../components';
import { List, ListItem } from 'react-native-elements';
import messages from './LoginForm.messages';

interface FormValues {
  dbName: string;
  password: string;
}

const defaultValues: FormValues = {
  dbName: '',
  password: '',
};

interface Props {
  dbs: string[];
  dbOpen: (dbName: string, password: string) => any;
  linkDbAdvanced: (dbName: string) => any;
}

export const LoginFormOpen: React.SFC<Props> = ({ dbs, dbOpen, linkDbAdvanced }) => {
  const items = dbs.map(db => ({ value: db, label: db }));
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(values: FormValues, e, formApi) => {
        dbOpen(values.dbName, values.password);
      }}
    >
      {formApi =>
        <List>
          <SelectField field="dbName" label="database:" items={items} />
          <TextField secure field="password" label="password:" placeholder="required" />
          <ListItem
            wrapperStyle={formStyles.wrapperStyle}
            title="advanced"
            onPress={() => linkDbAdvanced(formApi.values as any)}
          />
          <SubmitButton
            onPress={formApi.submitForm as any}
            title={messages.open.defaultMessage}
          />
        </List>
      }
    </Form>
  );
};
