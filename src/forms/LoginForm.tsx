import * as React from 'react';
import { Form } from 'react-form';
import { Picker, View, StyleSheet, Text, ListView, SectionList } from 'react-native';
import { connect } from 'react-redux';
import { RootState, selectors } from '../state';
import { TextField, SelectField, SubmitButton } from '../components';
import { FormLabel, FormInput, ButtonGroup, Divider } from 'react-native-elements';

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

const enum Mode {
  OpenExisting,
  CreateNew,
}

interface State {
  mode: Mode;
}

const buttons = [
  'open',
  'create'
];

export class LoginFormComponent extends React.Component<Props, State> {
  state: State = {
    mode: Mode.OpenExisting
  };

  modePressed = (selectedIndex: number) => {
    this.setState({ mode: selectedIndex });
  }

  render() {
    const { onSubmit, dbs } = this.props;
    const mode = dbs.length ? this.state.mode : Mode.CreateNew;
    const items = dbs.map(db => ({ value: db, label: db }));

    return (
      <>
      <IconHeader />
      <ButtonGroup
        onPress={this.modePressed}
        buttons={buttons}
        selectedIndex={mode}
        disableSelected
      />

      <Form
        defaultValues={defaultValues}
        onSubmit={(values: FormValues) => onSubmit(values)}
      >
        {formApi =>
          <List>
            {mode === Mode.CreateNew
              ? <TextField field="dbName" label="database:" placeholder="my database" />
              : <SelectField field="dbName" label="database:" items={items} />
            }
            <TextField secure field="password" label="password:" placeholder="required" />
            {mode === Mode.CreateNew &&
              <TextField secure field="confirmPassword" label="confirm password:" placeholder="required" />
            }
            <SubmitButton
              onPress={formApi.submitForm as any}
              title={mode === Mode.CreateNew ? 'create' : 'open'}
            />
          </List>
        }
      </Form>
      </>
    );
  }
}

export const LoginForm = connect(
  (state: RootState) => ({
    dbs: selectors.getDbs(state),
  })
)(LoginFormComponent);
