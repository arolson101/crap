import * as React from 'react';
import { Form } from 'react-form';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { RootState, selectors } from '../../state';
import TextField from './fields/TextField';

const DbName = styled.Text`
  color: red;
`;

const Container = styled.View`
  background-color: papayawhip;
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

export const LoginFormComponent = (props: Props) => {
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(values: FormValues) => props.onSubmit(values)}
    >
      {formApi =>
        <Container>
          {props.dbs.map(db => <DbName key={db}>{db}</DbName>)}
          <TextField field="password" label="password"/>
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
