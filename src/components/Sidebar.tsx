import * as React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'react-router-dom';
import { Bank, nav } from '../state';

const banks: Bank[] = [
  { name: '1st bank', id: '1', _deleted: 0 },
  { name: '2nd bank', id: '2', _deleted: 0 },
];

export const Sidebar: React.SFC = (props) => {
  return (
    <View>
      <Text>sidebar</Text>
      <Text><Link to={nav.home()}>home</Link></Text>
      <Text><Link to={nav.budgets()}>budgets</Link></Text>
      <Text><Link to={nav.accounts()}>accounts</Link></Text>
      {banks.map(bank =>
        <Text key={bank.id}><Link to={nav.bank(bank.id)}>{bank.name}</Link></Text>
      )}
    </View>
  );
};
