import * as React from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { nav, Bank, RootState, selectors, paths } from '../../state';
import { ctx } from '../ctx';
import { BankDisplay } from '../BankDisplay';
import { AccountsCreatePage } from './AccountsCreatePage';

interface Props {
  bankViews: Bank.View[];
}

export const AccountsPageComponent: React.SFC<Props> = (props, {router}: ctx.Router) => {
  return (
    <Switch>
      <Route path={paths.accounts.create} component={AccountsCreatePage}/>
      <Route>
        <>
          <Text>Accounts page</Text>
          {props.bankViews.map(bankView =>
            <BankDisplay key={bankView.bank.id} bank={bankView.bank} accounts={bankView.accounts}/>
          )}
          <Button onPress={() => router.history.push(nav.bankCreate())} title="add bank"/>
        </>
      </Route>
    </Switch>
  );
};
AccountsPageComponent.contextTypes = ctx.router;

export const AccountsPage = connect(
  (state: RootState) => ({
    bankViews: selectors.getBanks(state),
  })
)(AccountsPageComponent);
AccountsPage.displayName = 'AccountsPage';
