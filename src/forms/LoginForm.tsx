import * as React from 'react';
import { Form } from 'react-form';
import { Picker, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { RootState, selectors } from '../state';
import { TextField, SelectField } from '../components';
import { TextControl } from '../components/forms/styledFields';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

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

import { List, ListItem } from 'react-native-elements';
import { IconHeader } from '../components/icons';

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});

export const LoginFormComponent = ({onSubmit, dbs}: Props) => {
  const items = [
    ...dbs.map(db => ({value: db, label: db})),
    {value: 'new', label: 'new database'},
  ];

  return (
    <>
      <IconHeader/>
      <Form
        defaultValues={defaultValues}
        onSubmit={(values: FormValues) => onSubmit(values)}
      >
        {formApi =>
          <Container>
            <SelectField field="dbName" label="database:" items={items}/>
            <TextField field="password" label="password:"/>
            <SubmitButton onPress={formApi.submitForm as any} title="Submit"/>

            <List>
              <ListItem
                titleNumberOfLines={2}
                title="database name"
                textInput
                textInputPlaceholder="savings"
                subtitle="error text error text error text error text"
                hideChevron
              />
              <ListItem
                title="password"
                textInput
                textInputPlaceholder="password"
                subtitle="please enter a password"
                hideChevron
              />
            </List>
            <List>
              <ListItem
                titleNumberOfLines={2}
                title="database name"
                textInput
                textInputPlaceholder="My Crap"
                subtitle="error text error text error text error text"
                subtitleStyle={{color: 'red'}}
                rightIcon={{name: 'error', style: {color: 'red'} as any}}
              />
              <ListItem
                title="password"
                textInput
                textInputPlaceholder="password"
                subtitle="please enter a password"
                hideChevron
              />
            </List>
          </Container>
        }
      </Form>
    </>
  );
};

export const LoginForm = connect(
  (state: RootState) => ({
    dbs: selectors.getDbs(state),
  })
)(LoginFormComponent);
