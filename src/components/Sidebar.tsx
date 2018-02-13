import * as React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';
import { Bank, nav } from '../state';

const banks: Bank[] = [
  { name: '1st bank', id: '1', _deleted: 0 },
  { name: '2nd bank', id: '2', _deleted: 0 },
];

export const Sidebar: React.SFC = (props) => {
  return (
    <View>
      <Text>sidebar</Text>
      <Link to={nav.home()}><Text>home</Text></Link>
      <Link to={nav.budgets()}><Text>budgets</Text></Link>
      <Link to={nav.accounts()}><Text>accounts</Text></Link>
      {banks.map(bank =>
        <Link key={bank.id} to={nav.bank(bank.id)}><Text>{bank.name}</Text></Link>
      )}
    </View>
  );
};
