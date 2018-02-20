import * as React from 'react';
import { View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router';
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
