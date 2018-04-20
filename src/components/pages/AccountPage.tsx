import * as React from 'react';
import { View, Text } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { Button } from 'react-native';
import { compose } from 'recompose';
import { Queries } from '../../db';
import { nav } from '../../nav';
import { ctx } from '../ctx';

interface Params {
  bankId: string;
  accountId: string;
}

interface Props {
  query: Queries.Account;
}

export const AccountPageComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  if (props.query.loading) {
    return null;
  }
  const { router: { history, route } } = context;
  const { account } = props.query.data;

  return (
    <View>
      <Text>Account: {account.name}</Text>
      <Text>bank: {account.name}</Text>
      <Button title="edit" onPress={() => history.push(nav.accountUpdate(route.match.params.accountId, account.id))} />
    </View>
  );
};
AccountPageComponent.contextTypes = ctx.router;

export const AccountPage = compose(
  Queries.withAccount('query', (props: RouteComponentProps<Params>) => ({ accountId: props.match.params.accountId })),
)(AccountPageComponent);
AccountPage.displayName = 'AccountPage';
