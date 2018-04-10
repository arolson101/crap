import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState, selectors, Bank, nav } from '../state';
import { ctx } from './ctx';

const List = View;

interface Props {
  banks: Bank.View[];
}

export const SidebarComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history: { push } } } = context;
  return (
    <View style={{flex: 1, display: 'flex'}}>
      <ScrollView>
        <List>
          <ListItem onPress={() => push(nav.home())} title="home" leftIcon={{ name: 'home' }}  />
          <ListItem onPress={() => push(nav.budgets())} title="budgets" leftIcon={{ name: 'home' }}  />
          <ListItem onPress={() => push(nav.accounts())} title="accounts" leftIcon={{ name: 'home' }}  />
          {props.banks.map(view =>
            <React.Fragment key={view.bank.id}>
              <Text>{view.bank.name}</Text>
              {view.accounts.map(account =>
                <ListItem
                  key={account.id}
                  onPress={() => push(nav.accountView(view.bank.id, account.id))}
                  title={account.name}
                  subtitle={'$100.00'}
                  // subtitleNumberOfLines={3}
                  leftIcon={{ name: 'home' }}
                  // hideChevron
                />
              )}
            </React.Fragment>
          )}
        </List>
      </ScrollView>
    </View>
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
