import * as React from 'react';
import { Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Bank, nav } from '../state';

const banks: Bank[] = [
  { name: '1st bank', id: '1' as Bank.Id, _deleted: 0, accounts: [] },
  { name: '2nd bank', id: '2' as Bank.Id, _deleted: 0, accounts: [] },
];

interface Props {
}

type EnhancedProps = Props & RouteComponentProps<any>;

export const SidebarComponent = withRouter((props: EnhancedProps) => {
  const { history: { push } } = props;
  return (
    <List>
      <ListItem onPress={() => push(nav.home())} title="home" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={() => push(nav.budgets())} title="budgets" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={() => push(nav.accounts())} title="accounts" leftIcon={{ name: 'home' }} hideChevron />
      <Text>banks</Text>
      {banks.map(bank =>
        <ListItem
          key={bank.id}
          onPress={() => push(nav.bank(bank.id))}
          title={bank.name}
          subtitle={'$100.00'}
          subtitleNumberOfLines={3}
          leftIcon={{ name: 'home' }}
          hideChevron
        />
      )}
    </List>
  );
});

export const Sidebar = connect(
  null,
  {
  }
)(SidebarComponent);
