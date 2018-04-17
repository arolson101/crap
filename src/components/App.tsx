import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, paths } from '../state';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { LoginForm } from './forms/LoginForm';
import { AppContainer } from './layout/AppContainer';
import { Switch, Route } from 'react-router';

interface Props {
  isOpen?: boolean;
}

export const App: React.SFC<Props> = (props) => {
  return (
    <Switch>
      <Route exact path={paths.login} component={LoginForm}/>
      <Route>
        <AppContainer
          sidebar={<Sidebar/>}
          main={<MainView/>}
        />
      </Route>
    </Switch>
  );
};
