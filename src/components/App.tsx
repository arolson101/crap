import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../state';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { LoginForm } from './forms/LoginForm';
import { AppContainer } from './layout/AppContainer';

interface Props {
  isOpen?: boolean;
}

export const AppComponent: React.SFC<Props> = (props) => {
  if (props.isOpen) {
    return (
      <AppContainer
        sidebar={<Sidebar/>}
        main={<MainView/>}
      />
    );
  } else {
    return (
      <LoginForm/>
    );
  }
};

export const App = connect(
  (state: RootState) => ({
    isOpen: selectors.getDbIsOpen(state),
  }),
  {}
)(AppComponent);
App.displayName = 'App';
