import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RootState, Bank, Account, selectors, nav } from '../state';
import { ctx } from './ctx';

interface Props {
  bankId: Bank.Id;
}

interface ConnectedProps extends Props {
  bank: Bank;
  accounts: Account[];
}

export const BankDisplayComponent: React.SFC<ConnectedProps> = (props, { router }: ctx.Router) => {
  return (
    <View>
      <Text>{props.bank.name}</Text>
      <Button title="edit" onPress={() => router.history.push(nav.bankUpdate(props.bank.id))}/>
      {props.accounts.map(account =>
        <Button
          key={account.id}
          title={account.name}
          onPress={() => router.history.push(nav.account(props.bank.id, account.id))}
        />
      )}
      <Button title="add account" onPress={() => router.history.push(nav.accountCreate(props.bank.id))}/>
    </View>
  );
};
BankDisplayComponent.contextTypes = ctx.router;

export const BankDisplay = connect(
  (state: RootState, props: Props) => {
    return ({
      bank: selectors.getBank(state, props.bankId),
      accounts: selectors.getAccounts(state, props.bankId),
    });
  }
)(BankDisplayComponent);
BankDisplay.displayName = 'BankDisplay';
