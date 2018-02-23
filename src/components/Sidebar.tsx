import * as React from 'react';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, selectors, Bank, nav } from '../state';
import { ctx } from './ctx';

interface Props {
  banks: Bank[];
}

export const SidebarComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history: { push } } } = context;
  return (
    <List>
      <ListItem onPress={() => push(nav.home())} title="home" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={() => push(nav.budgets())} title="budgets" leftIcon={{ name: 'home' }} hideChevron />
      <ListItem onPress={() => push(nav.accounts())} title="accounts" leftIcon={{ name: 'home' }} hideChevron />
      {props.banks.map(bank =>
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
};
SidebarComponent.contextTypes = ctx.router;

export const Sidebar = connect(
  (state: RootState) => ({
    banks: selectors.getBanks(state),
  }),
  {
  }
)(SidebarComponent);
Sidebar.displayName = 'Sidebar';
