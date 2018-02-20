import * as React from 'react';
import { Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Bank, actions } from '../state';

const banks: Bank[] = [
  { name: '1st bank', id: '1' as Bank.Id, _deleted: 0, accounts: [] },
  { name: '2nd bank', id: '2' as Bank.Id, _deleted: 0, accounts: [] },
];

interface Props {
  navHome: () => any;
  navBudgets: () => any;
  navAccounts: () => any;
  navBank: (bankId: string) => any;
}

export const SidebarComponent: React.SFC<Props> = (props) => {
  return (
    <List>
      <ListItem onPress={props.navHome} title="home" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={props.navBudgets} title="budgets" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={props.navAccounts} title="accounts" leftIcon={{ name: 'home' }} hideChevron />
      <Text>banks</Text>
      {banks.map(bank =>
        <ListItem
          key={bank.id}
          onPress={() => props.navBank(bank.id)}
          title={bank.name}
          subtitle={'$100.00'}
          subtitleNumberOfLines={3}
          leftIcon={{ name: 'home' }}
          hideChevron
        />
      )}
    </List>
  );
};

export const Sidebar = connect(
  null,
  {
    navHome: actions.navHome,
    navBudgets: actions.navBudgets,
    navAccounts: actions.navAccounts,
    navBank: actions.navBank
  }
)(SidebarComponent);
