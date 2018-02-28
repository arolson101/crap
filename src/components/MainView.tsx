import * as React from 'react';
import { View, Text } from 'react-native';
import { Route, /*Redirect*/ } from 'react-router';
import * as Pages from './pages';
import { paths } from '../state';
import { ConnectedSwitch } from './ConnectedSwitch';

interface Props {
}

export const MainView: React.SFC<Props> = (props) => {
  return (
    <View>
      <ConnectedSwitch>
        <Route path={paths.root.home} exact component={Pages.HomePage} />
        <Route path={paths.root.budgets} component={Pages.BudgetsPage} />
        <Route path={paths.root.accounts} component={Pages.AccountsPage} />
        <Route component={() => <Text>404</Text>}/>>
        {/* <Redirect to="/" /> */}
      </ConnectedSwitch>
    </View>
  );
};
