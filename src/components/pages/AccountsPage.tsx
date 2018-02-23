import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { nav, Bank, RootState, selectors } from '../../state';
import { ctx } from '../ctx';

interface Props {
  banks: Bank[];
}

export const AccountsPageComponent: React.SFC<Props> = (props, {router}: ctx.Router) => {
  return (
    <View>
      <Text>Accounts page</Text>
      {props.banks.map(bank =>
        <Button key={bank.id} onPress={() => router.history.push(nav.bank(bank.id))} title={bank.name}/>
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
