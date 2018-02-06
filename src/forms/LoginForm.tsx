import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { IconHeader } from '../components/icons';
import { RootState, actions, selectors } from '../state';
import { LoginFormCreate } from './LoginForm.Create';
import { LoginFormOpen } from './LoginForm.Open';
import messages from './LoginForm.messages';

interface Props {
  dbs: string[];
  dbOpen: (dbName: string, password: string) => any;
  linkDbAdvanced: (dbName: string) => any;
  initialValuesCreate?: Partial<LoginFormCreate.Values>;
  initialValuesOpen?: Partial<LoginFormOpen.Values>;
}

const enum Mode {
  OpenExisting,
  CreateNew,
}

interface State {
  mode: Mode;
}

const buttons = [
  { element: () => <FormattedMessage {...messages.open} /> },
  { element: () => <FormattedMessage {...messages.create} /> },
];

export class LoginFormComponent extends React.Component<Props, State> {
  state: State = {
    mode: Mode.OpenExisting
  };

  modePressed = (selectedIndex: number) => {
    this.setState({ mode: selectedIndex });
  }

  render() {
    const { dbOpen, dbs, linkDbAdvanced, initialValuesCreate, initialValuesOpen } = this.props;
    const mode = dbs.length ? this.state.mode : Mode.CreateNew;

    return (
      <>
        <IconHeader />
        <ButtonGroup
          onPress={this.modePressed}
          buttons={buttons}
          selectedIndex={mode}
          disableSelected
        />

        {mode === Mode.CreateNew
          ? <LoginFormCreate dbs={dbs} dbOpen={dbOpen} initialValues={initialValuesCreate}/>
          : <LoginFormOpen dbs={dbs} dbOpen={dbOpen} linkDbAdvanced={linkDbAdvanced} initialValues={initialValuesOpen}/>
        }
      </>
    );
  }
}

export const LoginForm = connect(
  (state: RootState) => ({
    dbs: selectors.getDbs(state),
  }),
  {
    linkDbAdvanced: actions.linkDbAdvanced,
    dbOpen: actions.dbOpen,
  }
)(LoginFormComponent);
