import * as React from 'react';
import { View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import * as Pages from './pages';

export const MainView: React.SFC = (props) => {
  return (
    <View>
      <Switch>
        <Route exact path="/" component={Pages.Home}/>
        <Route path="/budgets" component={Pages.Budgets}/>
        <Route path="/accounts" component={Pages.Accounts}/>
        <Route path="/bank/:bankId" component={Pages.Bank}/>
        <Route path="/account/:accountId" component={Pages.Account}/>
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
