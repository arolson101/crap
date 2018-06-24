import { ThemeProvider } from 'glamorous'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { LoginPage, RootPage } from '../screens'
import { LoadFonts } from './LoadFonts'
import { defaultTheme } from './Theme'
import { DbContext } from './ctx'

interface Props {
  isOpen?: boolean
}

const App = (props: Props) => {
  return (
    <LoadFonts>
      <ThemeProvider theme={defaultTheme}>
        <DbContext.Consumer>
          {db => {
            if (db && db.isOpen) {
              return <RootPage />
            } else {
              return <LoginPage />
            }
          }}
        </DbContext.Consumer>
      </ThemeProvider>
    </LoadFonts>
  )
}

export default hot(module)(App)
