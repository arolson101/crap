import * as React from 'react';
import { View } from 'react-native';
import { Route, Redirect } from 'react-router';
import * as Pages from './pages';
import { paths } from '../state';
import { ConnectedSwitch } from './ConnectedSwitch';

interface Props {
}

export const MainView: React.SFC<Props> = (props) => {
  return (
    <View>
      <ConnectedSwitch>
        <Route path={paths.home} exact component={Pages.HomePage} />
        <Route path={paths.budgets} component={Pages.BudgetsPage} />
        <Route path={paths.accounts} exact component={Pages.AccountsPage} />
        <Route path={paths.bankCreate} component={Pages.AddAccountPage} />
        <Route path={paths.bankUpdate} component={Pages.BankUpdatePage} />
        <Route path={paths.accountCreate} component={Pages.AddAccountPage} />
        <Route path={paths.account} exact component={Pages.AccountDisplayPage} />
        <Route path={paths.accountUpdate} component={Pages.AccountUpdatePage} />
        <Redirect to="/" />
      </ConnectedSwitch>
    </View>
  );
};
