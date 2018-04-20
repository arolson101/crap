import * as React from 'react';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { LoginForm } from './forms/LoginForm';
import { AppContainer } from './layout/AppContainer';
import { Db } from './ctx';

interface Props {
  isOpen?: boolean;
}

export const App: React.SFC<Props> = (props) => {
  return (
    <Db.Consumer>
      {db => {
        if (db && db.isOpen) {
          return (
            <AppContainer
              sidebar={<Sidebar />}
              main={<MainView />}
            />
          );
        } else {
          return (
            <LoginForm />
          );
        }
      }}
    </Db.Consumer>
  );
};
