import 'node-libs-react-native/globals'
import 'intl'
import { AppRegistry } from 'react-native'
import Root from './App/Root'

// tslint:disable-next-line:no-duplicate-imports
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

AppRegistry.registerComponent('crap', () => Root)
