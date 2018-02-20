import * as React from 'react';
import { View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router';
import * as Pages from './pages';
import { paths } from '../state/actions';

export const MainView: React.SFC = (props) => {
  return (
    <View>
      <Switch>
        <Route exact path={paths.home} component={Pages.HomePage}/>
        <Route path={paths.budgets} component={Pages.BudgetsPage}/>
        <Route path={paths.accounts} component={Pages.AccountsPage}/>
        <Route path={paths.bank} component={Pages.BankPage}/>
        <Route path={paths.account} component={Pages.AccountPage}/>
        <Redirect to="/"/>
      </Switch>
    </View>
  );
};
