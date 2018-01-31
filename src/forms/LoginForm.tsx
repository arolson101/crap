import * as React from 'react';
import { Form } from 'react-form';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { RootState, selectors } from '../state';
import { TextField, SelectField } from '../components';

const Container = styled.View`
`;

const SubmitButton = styled.Button`
  flex: 1;
`;

interface FormValues {
  dbName: string;
  password: string;
  passwordConfirm: string;
}

const defaultValues: FormValues = {
  dbName: '',
  password: '',
  passwordConfirm: '',
};

interface Props {
  dbs: string[];
  onSubmit: (values: FormValues) => any;
}

export const LoginFormComponent = ({onSubmit, dbs}: Props) => {
  const items = [
    ...dbs.map(db => ({value: db, label: db})),
    {value: 'new', label: 'new database'},
  ];

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(values: FormValues) => onSubmit(values)}
    >
      {formApi =>
        <Container>
          <SelectField field="dbName" label="database:" items={items}/>
          <TextField field="password" label="password:"/>
          <SubmitButton onPress={formApi.submitForm as any} title="Submit"/>
        </Container>
      }
    </Form>
  );
};

export const LoginForm = connect(
  (state: RootState) => ({
    dbs: selectors.getDbs(state),
  })
)(LoginFormComponent);
