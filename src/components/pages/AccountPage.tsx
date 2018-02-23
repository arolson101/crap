import * as React from 'react';
import { View, Text } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { RootState, Bank, Account, selectors, nav } from '../../state';
import { AccountForm } from '../forms/AccountForm';

interface Params {
  bankId: Bank.Id;
  accountId: Account.Id;
}

interface Props extends RouteComponentProps<Params> {
  bank: Bank;
  account: Account;
}

export const AccountCreatePageComponent: React.SFC<Props> = ({bank, children}) => (
  <AccountForm bank={bank}>
    {children}
  </AccountForm>
);

export const AccountCreatePage = connect(
  (state: RootState, props: Props) => {
    return ({
      bank: selectors.getBank(state, props.match.params.bankId),
    });
  }
)(AccountCreatePageComponent);
AccountCreatePage.displayName = 'AccountCreatePage';

export const AccountDisplayPageComponent: React.SFC<Props> = (props) => {
  return (
    <View>
      <Text>Account id {props.account.id}</Text>
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
  <AccountForm bank={bank} edit={account}>
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
