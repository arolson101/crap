console.log('index.web')
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App/App'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'normalize.css/normalize.css'

const runApp = () => {
  ReactDOM.render(React.createElement(App, {}), document.getElementById('root'))
}

runApp()

const registerServiceWorker = require('./registerServiceWorker').default
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App/App', () => {
    runApp()
  })
}
