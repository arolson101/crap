import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { AppRegistry, Platform } from 'react-native'
import Root from './App/Root'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'normalize.css/normalize.css'

AppRegistry.registerComponent('App', () => Root)

const runApp = () => {
  AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })
}

runApp()

const registerServiceWorker = require('./registerServiceWorker').default
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App/Root', () => {
    runApp()
  })
}
