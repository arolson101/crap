import * as React from 'react';
import { Form } from 'react-form';
import styled from 'styled-components/native';
import TextField from './forms/fields/TextField';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

const SubmitButton = styled.Button`
  flex: 1;
  color: aliceblue;
`;

const FormTest: React.SFC = props => {
  return (
    <Form
      defaultValues={{email: ''}}
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      {(formApi) =>
        <Container>
          <TextField field="email" label="Email:"/>
          <TextField field="email" label="Email:"/>
          <SubmitButton onPress={formApi.submitForm as any} title="Submit"/>
        </Container>
      }
    </Form>
  );
};

export default FormTest;
