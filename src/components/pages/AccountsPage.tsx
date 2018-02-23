import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { nav, Bank, RootState, selectors } from '../../state';
import { ctx } from '../ctx';
import { BankDisplay } from '../BankDisplay';

interface Props {
  banks: Bank[];
}

export const AccountsPageComponent: React.SFC<Props> = (props, {router}: ctx.Router) => {
  return (
    <View>
      <Text>Accounts page</Text>
      {props.banks.map(bank =>
        <BankDisplay key={bank.id} bankId={bank.id}/>
      )}
      <Button onPress={() => router.history.push(nav.bankCreate())} title="add bank"/>
    </View>
  );
};
AccountsPageComponent.contextTypes = ctx.router;

export const AccountsPage = connect(
  (state: RootState) => ({
    banks: selectors.getBanks(state),
  })
)(AccountsPageComponent);
AccountsPage.displayName = 'AccountsPage';
