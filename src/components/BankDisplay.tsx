import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { nav } from '../nav';
import { Mutations } from '../db';
import { ctx } from './ctx';

interface Props {
  bank: {
    name: string;
    id: string;
    accounts: Array<{
      name: string;
      id: string;
    }>;
  };
  deleteBank: Mutations.DeleteBank;
}

export const BankDisplay: React.SFC<Props> = (props, { router }: ctx.Router) => {
  return (
    <View>
      <Text>{props.bank.name}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button title="edit bank" onPress={() => router.history.push(nav.bankUpdate(props.bank.id))}/>
        <Button title="delete bank" onPress={() => props.deleteBank.execute({variables: {bankId: props.bank.id}})}/>
        <Button title="add account" onPress={() => router.history.push(nav.accountCreate(props.bank.id))}/>
      </View>
      {props.bank.accounts.map(account =>
        <View key={account.id} style={{flexDirection: 'row'}}>
          <Button
            title={account.name}
            onPress={() => router.history.push(nav.accountView(props.bank.id, account.id))}
          />

          <Button
            title="delete"
            onPress={() => router.history.push(nav.accountView(props.bank.id, account.id))}
          />
        </View>
      )}
    </View>
  );
};
BankDisplay.contextTypes = ctx.router;
