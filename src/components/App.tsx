import * as React from 'react';
import { View, Text } from 'react-native';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { Bank } from '../state';

export const banks: Bank[] = [
  { name: '1st bank', id: '1', _deleted: 0 },
  { name: '2nd bank', id: '2', _deleted: 0 },
];

export const BankLink: React.SFC<{bankId: string}> = ({bankId, children}) => (
  <Link to={`/bank/${bankId}`}>
    {children}
  </Link>
);

export const Sidebar: React.SFC = (props) => {
  return (
    <View>
      <Text>sidebar</Text>
      {banks.map(bank =>
        <BankLink key={bank.id} bankId={bank.id}><Text>{bank.name}</Text></BankLink>
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
      <Text>bank {props.match.params.bankId}</Text>
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
      <Text>
        [<Link to="/home">home</Link>]
        [<Link to="/budgets">budgets</Link>]
        [<Link to="/accounts">accounts</Link>]
      </Text>
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

export const paths = [
  '/home',
  '/accounts',
  '/budgets',
  '/account/:accountId',
  '/budget/:budgetId',
];

export class App extends React.Component {
  render() {
    return (
      <Router>
        <View>
          <Sidebar/>
          <MainView/>
        </View>
      </Router>
    );
  }
}
