import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RootState, selectors } from '../state';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { LoginForm } from './forms/LoginForm';

interface Props {
  isOpen?: boolean;
}

export const AppComponent: React.SFC<Props> = (props) => {
  if (props.isOpen) {
    return (
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Sidebar/>
        </View>
        <View style={styles.main}>
          <MainView/>
        </View>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  }
});
