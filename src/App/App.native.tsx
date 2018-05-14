import * as React from 'react'
import { RootPage, LoginPage } from '../pages'
import { LoadFonts } from './LoadFonts'
import { AppThemeProvider } from './Theme'
import { DbContext } from './ctx'

interface Props {
  isOpen?: boolean
}

const App = (props: Props) => {
  return (
    <LoadFonts>
      <AppThemeProvider>
        <DbContext.Consumer>
          {db => {
            if (db && db.isOpen) {
              return <RootPage />
            } else {
              return <LoginPage />
            }
          }}
        </DbContext.Consumer>
      </AppThemeProvider>
    </LoadFonts>
  )
}

export default App
