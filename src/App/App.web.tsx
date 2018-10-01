console.log('web')
import { Text } from '@blueprintjs/core'
import { ThemeProvider } from 'glamorous'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import { ReduxProvider } from '../redux/index'
import { LoginScreen } from '../screens/index'
import { MainView } from '../screens/MainView'
import { Sidebar } from '../screens/Sidebar'
import { LoadFonts } from './LoadFonts'
import { defaultTheme } from './Theme'
import './App.web.css'

// https://github.com/tomkp/react-split-pane/issues/252
require('react-split-pane').default = require('react-split-pane')

interface Props {
  isOpen?: boolean
}

const Auth: React.SFC<Props> = ({ isOpen }) => {
  if (isOpen) {
    return (
      <SplitPane
        split='vertical'
        minSize={50}
        maxSize={300}
        defaultSize={150}
      >
        <Sidebar />
        <MainView />
      </SplitPane>
    )
  } else {
    return <LoginScreen />
  }
}

const App: React.SFC = (props) => {
  return (
    <LoadFonts>
      <ReduxProvider>
        <IntlProvider locale='en' textComponent={Text}>
          <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
              <Auth />
            </ThemeProvider>
          </BrowserRouter>
        </IntlProvider>
      </ReduxProvider>
    </LoadFonts>
  )
}

export default hot(module)(App)
