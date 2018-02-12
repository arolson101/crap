import * as React from 'react';
import { View, Text } from 'react-native';
import { Route, Link, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { Bank, nav } from '../state';

export const banks: Bank[] = [
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

export const Home: React.SFC = (props) => {
  return (
    <View>
      <Text>home tab</Text>
    </View>
  );
};

export const Accounts: React.SFC = (props) => {
  return (
    <View>
      <Text>accounts tab</Text>
    </View>
  );
};

export const Budgets: React.SFC = (props) => {
  return (
    <View>
      <Text>budgets tab</Text>
    </View>
  );
};

export const BankTab: React.SFC<RouteComponentProps<{bankId: string}>> = (props) => {
  return (
    <View>
      <Text>bank id {props.match.params.bankId}</Text>
    </View>
  );
};

export const Account: React.SFC = (props) => {
  return (
    <View>
      <Text>account tab</Text>
    </View>
  );
};

export const MainView: React.SFC = (props) => {
  return (
    <View>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/budgets" component={Budgets}/>
        <Route path="/accounts" component={Accounts}/>
        <Route path="/bank/:bankId" component={BankTab}/>
        <Route path="/account/:accountId" component={Account}/>
        <Redirect to="/"/>
      </Switch>
    </View>
  );
};

export class App extends React.Component {
  render() {
    return (
      <View>
        <Sidebar/>
        <MainView/>
      </View>
    );
  }
}
