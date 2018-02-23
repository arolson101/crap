import * as React from 'react';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, selectors, Bank, nav } from '../state';
import { ctx } from './ctx';

interface Props {
  bankViews: Bank.View[];
}

export const SidebarComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history: { push } } } = context;
  return (
    <List>
      <ListItem onPress={() => push(nav.home())} title="home" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={() => push(nav.budgets())} title="budgets" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={() => push(nav.accounts())} title="accounts" leftIcon={{ name: 'home' }} hideChevron />
      {props.bankViews.map(bankView =>
        <>
          <Text>{bankView.bank.name}</Text>
          {bankView.accounts.map(account =>
            <ListItem
              key={bankView.bank.id}
              onPress={() => push(nav.account(bankView.bank.id, account.id))}
              title={account.name}
              subtitle={'$100.00'}
              subtitleNumberOfLines={3}
              leftIcon={{ name: 'home' }}
              hideChevron
            />
          )}
        </>
      )}
    </List>
  );
};
SidebarComponent.contextTypes = ctx.router;

export const Sidebar = connect(
  (state: RootState) => ({
    bankViews: selectors.getBanks(state),
  }),
  {
  }
)(SidebarComponent);
Sidebar.displayName = 'Sidebar';
