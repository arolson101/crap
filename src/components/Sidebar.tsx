import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { compose } from 'recompose';
import { nav } from '../nav';
import { Queries } from '../db';
import { ctx } from './ctx';

const List = View;

interface Props {
  query: Queries.Accounts;
}

export const SidebarComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history: { push } } } = context;
  if (props.query.loading) {
    return null;
  }
  return (
    <View style={{flex: 1, display: 'flex'}}>
      <ScrollView>
        <List>
          <ListItem onPress={() => push(nav.home())} title="home" leftIcon={{ name: 'home' }}  />
          <ListItem onPress={() => push(nav.budgets())} title="budgets" leftIcon={{ name: 'home' }}  />
          <ListItem onPress={() => push(nav.accounts())} title="accounts" leftIcon={{ name: 'home' }}  />
          {props.query.data.banks.map(bank =>
            <React.Fragment key={bank.id}>
              <Text>{bank.name}</Text>
              {bank.accounts.map(account =>
                <ListItem
                  key={account.id}
                  onPress={() => push(nav.accountView(bank.id, account.id))}
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

export const Sidebar = compose(
  Queries.withAccounts('query'),
)(SidebarComponent);
Sidebar.displayName = 'Sidebar';
