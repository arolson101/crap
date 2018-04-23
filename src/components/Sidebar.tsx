import * as React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
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
          <Button onPress={() => push(nav.home())} title="home"/>
          <Button onPress={() => push(nav.budgets())} title="budgets"/>
          <Button onPress={() => push(nav.accounts())} title="accounts"/>
          {props.query.data.banks.map(bank =>
            <React.Fragment key={bank.id}>
              <Text>{bank.name}</Text>
              {bank.accounts.map(account =>
                <Button
                  key={account.id}
                  onPress={() => push(nav.accountView(bank.id, account.id))}
                  title={account.name}
                  // subtitle={'$100.00'}
                  // subtitleNumberOfLines={3}
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
