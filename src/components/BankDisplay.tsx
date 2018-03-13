import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { Bank, Account, nav } from '../state';
import { ctx } from './ctx';

interface Props {
  bank: Bank;
  accounts: Account[];
}

export const BankDisplay: React.SFC<Props> = (props, { router }: ctx.Router) => {
  return (
    <View>
      <Text>{props.bank.name}</Text>
      <Button title="edit" onPress={() => router.history.push(nav.bankUpdate(props.bank.id))}/>
      {props.accounts.map(account =>
        <Button
          key={account.id}
          title={account.name}
          onPress={() => router.history.push(nav.accountView(props.bank.id, account.id))}
        />
      )}
      <Button title="add account" onPress={() => router.history.push(nav.accountCreate(props.bank.id))}/>
    </View>
  );
};
BankDisplay.contextTypes = ctx.router;
