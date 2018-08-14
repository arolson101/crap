import 'node-libs-react-native/globals'
import 'intl'
import { AppRegistry } from 'react-native'
import App from './App/App'

// tslint:disable-next-line:no-duplicate-imports
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
YellowBox.ignoreWarnings(['Module SQLite requires',])
YellowBox.ignoreWarnings(['Module RCTImageLoader requires',])
YellowBox.ignoreWarnings(['Module RNRandomBytes requires',])
YellowBox.ignoreWarnings(['Module KeyboardTrackingViewManager requires',])
YellowBox.ignoreWarnings(['Module RCTCustomInputController requires',])
YellowBox.ignoreWarnings(['Remote debugger is in a background tab',])

AppRegistry.registerComponent('crap', () => App)
