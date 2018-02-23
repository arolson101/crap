import * as React from 'react';
import { View, Text } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { RootState, Bank, Account, selectors, nav } from '../../state';
import { BankForm } from '../forms/BankForm';

interface Params {
  bankId: Bank.Id;
}

export const BankCreatePage: React.SFC = ({children}) => (
  <BankForm>
    {children}
  </BankForm>
);

interface Props extends RouteComponentProps<Params> {
  bank: Bank;
  accounts: Account[];
}

export const BankDisplayPageComponent: React.SFC<Props> = (props) => {
  return (
    <View>
      <Text>bank id {props.bank.id}</Text>
      <Text>{props.bank.name}</Text>
      <Button title="edit" onPress={() => props.history.push(nav.bankUpdate(props.bank.id))}/>
      {props.accounts.map(account =>
        <Button
          key={account.id}
          title={account.name}
          onPress={() => props.history.push(nav.account(props.bank.id, account.id))}
        />
      )}
      <Button title="add account" onPress={() => props.history.push(nav.accountCreate(props.bank.id))}/>
    </View>
  );
};

export const BankDisplayPage = connect(
  (state: RootState, props: Props) => {
    return ({
      bank: selectors.getBank(state, props.match.params.bankId),
      accounts: selectors.getAccounts(state, props.match.params.bankId),
    });
  }
)(BankDisplayPageComponent);
BankDisplayPage.displayName = 'BankDisplayPage';

export const BankUpdatePageComponent: React.SFC<Props> = ({bank, children}) => (
  <BankForm edit={bank}>
    {children}
  </BankForm>
);

export const BankUpdatePage = connect(
  (state: RootState, props: Props) => {
    return ({
      bank: selectors.getBank(state, props.match.params.bankId),
    });
  }
)(BankUpdatePageComponent);
BankUpdatePage.displayName = 'BankUpdatePage';
