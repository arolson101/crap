import * as React from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { compose } from 'recompose';
import { nav, RootState, selectors, paths } from '../../state';
import { Queries, Mutations } from '../../db';
import { ctx } from '../ctx';
import { BankDisplay } from '../BankDisplay';
import { ErrorMessage } from '../forms/fields';
import { AccountsCreatePage } from './AccountsCreatePage';
import { AccountsUpdatePage } from './AccountsUpdatePage';
import { AccountPage } from './AccountPage';

interface Props {
  query: Queries.Banks;
  deleteBank: Mutations.DeleteBank;
}

export const AccountsPageComponent: React.SFC<Props> = (props, {router}: ctx.Router) => {
  if (props.query.loading) {
    return null;
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />;
  }

  return (
    <Switch>
      <Route path={paths.account.create} component={AccountsCreatePage}/>
      <Route path={paths.account.update} component={AccountsUpdatePage}/>
      <Route path={paths.account.view} component={AccountPage}/>
      <Route>
        <>
          <Text>Accounts page</Text>
          {props.query.data.banks.map(bank =>
            <BankDisplay key={bank.id} bank={bank} deleteBank={props.deleteBank}/>
          )}
          <Button onPress={() => router.history.push(nav.bankCreate())} title="add bank"/>
        </>
      </Route>
    </Switch>
  );
};
AccountsPageComponent.contextTypes = ctx.router;

export const AccountsPage = compose(
  Queries.withBanks('query'),
  Mutations.withDeleteBank('deleteBank'),
)(AccountsPageComponent);
AccountsPage.displayName = 'AccountsPage';
