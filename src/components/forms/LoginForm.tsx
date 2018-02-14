import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, actions, selectors } from '../../state';
import { LoginFormCreate } from './LoginForm.Create';
import { LoginFormOpen } from './LoginForm.Open';
import messages from './LoginForm.messages';

interface Props {
  dbs: string[];
  openError: Error | undefined;
  dbOpen: (dbName: string, password: string) => any;
  navDbAdvanced: (dbName: string) => any;
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
    const { dbOpen, openError, dbs, navDbAdvanced, initialValuesCreate, initialValuesOpen } = this.props;
    const mode = dbs.length ? this.state.mode : Mode.CreateNew;

    return (
      <>
        <ButtonGroup
          onPress={this.modePressed}
          buttons={buttons}
          selectedIndex={mode}
          selectedIndexes={[mode]}
          disableSelected
        />

        {mode === Mode.CreateNew
          ? <LoginFormCreate
            dbs={dbs}
            dbOpen={dbOpen}
            openError={openError}
            initialValues={initialValuesCreate}
          />
          : <LoginFormOpen
            dbs={dbs}
            dbOpen={dbOpen}
            openError={openError}
            navDbAdvanced={navDbAdvanced}
            initialValues={initialValuesOpen}
          />
        }
      </>
    );
  }
}

export const LoginForm = connect(
  (state: RootState) => ({
    dbs: selectors.getDbs(state),
    openError: selectors.getDbOpenError(state),
  }),
  {
    dbOpen: actions.dbOpen,
    navDbAdvanced: actions.navDbAdvanced,
  }
)(LoginFormComponent);
