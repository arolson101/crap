import * as React from 'react';
import { hot } from 'react-hot-loader';
import { LoadFonts } from './LoadFonts';
import { MainView } from './MainView';
import { Sidebar } from './Sidebar';
import { AppThemeProvider } from './Theme';
import { Db } from './ctx';
import { LoginForm } from './forms/LoginForm';
import { AppContainer } from './layout/AppContainer';

interface Props {
  isOpen?: boolean
}

const App: React.SFC<Props> = (props) => {
  return (
    <LoadFonts>
      <AppThemeProvider>
        <Db.Consumer>
          {db => {
            if (db && db.isOpen) {
              return (
                <AppContainer
                  sidebar={<Sidebar />}
                  main={<MainView />}
                />
              )
            } else {
              return (
                <LoginForm />
              )
            }
          }}
        </Db.Consumer>
      </AppThemeProvider>
    </LoadFonts>
  )
}

export default hot(module)(App)
