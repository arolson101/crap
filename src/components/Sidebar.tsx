import * as React from 'react';
import { Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Link } from 'react-router-native';
import { Bank, nav } from '../state';

const banks: Bank[] = [
  { name: '1st bank', id: '1', _deleted: 0 },
  { name: '2nd bank', id: '2', _deleted: 0 },
];

export const Sidebar: React.SFC = (props) => {
  return (
    <List>
      <ListItem title="sidebar"/>
      <ListItem onPress={() => null} title="home" leftIcon={{name: 'home'}} hideChevron/>
      <Link to={nav.home()}><Text>home</Text></Link>
      <Link to={nav.budgets()}><Text>budgets</Text></Link>
      <Link to={nav.accounts()}><Text>accounts</Text></Link>
      {banks.map(bank =>
        <Link key={bank.id} to={nav.bank(bank.id)}><Text>{bank.name}</Text></Link>
      )}
    </List>
  );
};
