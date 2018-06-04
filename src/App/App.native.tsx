import { ThemeProvider } from 'glamorous-native'
import * as React from 'react'
import { RootPage, LoginPage } from '../pages'
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

export default App
