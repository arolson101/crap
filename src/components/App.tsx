import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Sidebar } from './Sidebar'
import { LoadFonts } from './LoadFonts'
import { MainView } from './MainView'
import { LoginForm } from './forms/LoginForm'
import { AppContainer } from './layout/AppContainer'
import { Router } from './Router'
import { Db } from './ctx'
import { AppThemeProvider } from './Theme'

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
