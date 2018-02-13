import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Route, Switch, Redirect } from 'react-router';
import { Sidebar } from './Sidebar';
import * as Pages from './pages';
import { paths } from '../state/actions';

export const MainView: React.SFC = (props) => {
  return (
    <View>
      <Switch>
        <Route exact path={paths.home} component={Pages.Home}/>
        <Route path={paths.budgets} component={Pages.Budgets}/>
        <Route path={paths.accounts} component={Pages.Accounts}/>
        <Route path={paths.bank} component={Pages.Bank}/>
        <Route path={paths.account} component={Pages.Account}/>
        <Redirect to="/"/>
      </Switch>
    </View>
  );
};

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

export class App extends React.Component {
  render() {
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
  }
}
