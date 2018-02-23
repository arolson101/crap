import * as React from 'react';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootState, selectors, Bank, nav } from '../state';

interface Props extends RouteComponentProps<any> {
  banks: Bank[];
}

export const SidebarComponent = withRouter((props: Props) => {
  const { history: { push } } = props;
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
});

export const Sidebar = connect(
  (state: RootState) => ({
    banks: selectors.getBanks(state),
  }),
  {
  }
)(SidebarComponent);
