import * as React from 'react';
import { View, Text } from 'react-native';
import { RouteComponentProps } from 'react-router';
// import { connect } from 'react-redux';
import { Button } from 'react-native';
import { RootState, Bank, Account, selectors, nav } from '../../state';
import { AccountForm } from '../forms/AccountForm';
import { connect } from '../connect';

interface Params {
  bankId: Bank.Id;
  accountId: Account.Id;
}

interface Props extends RouteComponentProps<Params> {
  bank: Bank;
  account: Account;
}

export const AccountDisplayPageComponent: React.SFC<Props> = (props) => {
  return (
    <View>
      <Text>Account: {props.account.name}</Text>
      <Text>bank: {props.bank.name}</Text>
      <Button title="edit" onPress={() => props.history.push(nav.accountUpdate(props.bank.id, props.account.id))}/>
    </View>
  );
};

export const AccountDisplayPage = connect(
  (state: RootState, props: Props) => {
    return ({
      bank: selectors.getBank(state, props.match.params.bankId),
      account: selectors.getAccount(state, props.match.params.accountId),
    });
  }
)(AccountDisplayPageComponent);
AccountDisplayPage.displayName = 'AccountDisplayPage';

export const AccountUpdatePageComponent: React.SFC<Props> = ({bank, account, children}) => (
  <AccountForm bankId={bank.id} edit={account}>
    {children}
  </AccountForm>
);

export const AccountUpdatePage = connect(
  (state: RootState, props: Props) => {
    return ({
      bank: selectors.getBank(state, props.match.params.bankId),
      account: selectors.getAccount(state, props.match.params.accountId),
    });
  }
)(AccountUpdatePageComponent);
AccountUpdatePage.displayName = 'AccountUpdatePage';
