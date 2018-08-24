import { Root, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { InjectedIntlProps, injectIntl, IntlProvider, defineMessages } from 'react-intl'
import { Platform, SafeAreaView, ImageRequireSource } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, NavigationContainerComponent, NavigationRouteConfigMap, NavigationScreenConfig, NavigationScreenConfigProps, NavigationScreenOptions, TabNavigatorConfig } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as modals from '../modals/index'
import { paths } from '../nav'
import { nativeActions } from '../redux/actions/nativeActions'
import { ReduxProvider } from '../redux/index'
import * as screens from '../screens/index'
import { ScreenComponent, ScreenProps, makeScreen } from '../screens/Screen'
import { LoadFonts } from './LoadFonts'

const getCurrentParams = (state: any): any => {
  if (state.routes) {
    return getCurrentParams(state.routes[state.index])
  }
  return state.params || {}
}

const makeTab = <C extends NavigationRouteConfigMap, N extends keyof C & string>(
  initialRouteName: N,
  icon: (focused: boolean) => string,
  routeConfigMap: C
) => {
  const primaryScreen = routeConfigMap[initialRouteName] as ScreenComponent<any>
  const stack = createStackNavigator(routeConfigMap, { initialRouteName })
  stack.navigationOptions = ({ navigation, screenProps }: NavigationScreenConfigProps): NavigationScreenConfig<NavigationScreenOptions> => {
    const title = primaryScreen.title(navigation.state.params!)
    const tabBarLabel = (typeof title === 'string') ? title : (screenProps as ScreenProps).intl.formatMessage(title)
    return ({
      tabBarIcon: ({ focused, tintColor }) => {
        const name = icon(focused)
        const IconClass = Platform.select({
          android: MaterialIcons,
          ios: Ionicons,
        })
        return <IconClass color={tintColor!} size={25} name={name} />
      },
      tabBarLabel,
    })
  }
  stack.displayName = `makeTab(${initialRouteName})`
  return stack
}

const homeStack = makeTab(
  'Home',
  (focused) => Platform.select({
    ios: `ios-home${focused ? '' : '-outline'}`,
    android: `home`,
  }),
  {
    Home: screens.HomeScreen,
  }
)

const budgetsStack = makeTab(
  'Budgets',
  (focused) => Platform.select({
    ios: `ios-cash${focused ? '' : '-outline'}`,
    android: `receipt`,
  }),
  {
    Budgets: screens.BudgetsScreen
  }
)

const accountsStack = makeTab(
  'Accounts',
  (focused) => Platform.select({
    ios: `ios-paper${focused ? '' : '-outline'}`,
    android: `account-balance`,
  }),
  {
    Accounts: screens.AccountsScreen,
    [paths.bank]: screens.BankScreen,
    [paths.account]: screens.AccountScreen,
  }
)

const createBottomTabNavigatorFcn = Platform.OS === 'android' ? createMaterialBottomTabNavigator : createBottomTabNavigator
const mainStack = createBottomTabNavigatorFcn(
  {
    [paths.root.home]: homeStack,
    [paths.root.budgets]: budgetsStack,
    [paths.root.accounts]: accountsStack,
  },
  {
    initialRouteName: paths.root.accounts,
    order: [
      paths.root.home,
      paths.root.budgets,
      paths.root.accounts,
    ],
    barStyle: {
      backgroundColor: platform.tabActiveBgColor
    },
    activeTintColor: platform.tabBarActiveTextColor,
    inactiveTintColor: platform.tabBarTextColor,
  } as TabNavigatorConfig
)
mainStack.displayName = 'mainStack'

const appStack = createStackNavigator(
  {
    main: mainStack,
    // [paths.modal]: modalStack,
    [paths.bankCreate]: createStackNavigator({ 'modal': modals.BankModal }),
    [paths.bankEdit]: createStackNavigator({ 'modal': modals.BankModal }),
    [paths.accountCreate]: createStackNavigator({ 'modal': modals.AccountModal }),
    [paths.accountEdit]: createStackNavigator({ 'modal': modals.AccountModal }),
    [paths.transactionCreate]: createStackNavigator({ 'modal': modals.TransactionModal }),
    [paths.transactionEdit]: createStackNavigator({ 'modal': modals.TransactionModal }),
    [paths.picker]: createStackNavigator({ 'modal': modals.PickerModal }),
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'main',
  }
)
appStack.displayName = 'appStack'

const loginStack = createStackNavigator({
  Login: screens.LoginScreen
}, { headerMode: 'none' })
loginStack.displayName = 'loginStack'

const AuthStack = createSwitchNavigator({
  [paths.login]: loginStack,
  [paths.app]: appStack,
})
AuthStack.displayName = 'AuthStack'

interface TopNavigatorComponentProps extends InjectedIntlProps {
  setTopNavigator: (topNavigator: NavigationContainerComponent) => any
}

const AppNavigatorComponent: React.SFC<TopNavigatorComponentProps> = ({ setTopNavigator, intl }) => {
  const screenProps: ScreenProps = ({ intl })
  return (
    <AuthStack screenProps={screenProps} ref={setTopNavigator} />
  )
}

const AppNavigator = compose(
  injectIntl,
  connect(null, { setTopNavigator: nativeActions.setTopNavigator })
)(AppNavigatorComponent)
AppNavigator.displayName = 'AppNavigator'

const Services: React.SFC = ({ children }) => {
  return (
    <LoadFonts>
      <ReduxProvider>
        <IntlProvider locale='en' textComponent={Text}>
          {/* <Root> */}
            <SafeAreaView>
              {children}
            </SafeAreaView>
          {/* </Root> */}
        </IntlProvider>
      </ReduxProvider>
    </LoadFonts>
  )
}

const App: React.SFC = () => {
  return (
    <Services>
      <AppNavigator />
    </Services>
  )
}

export default App

import { Navigation } from 'react-native-navigation'
import { LoginScreen, LoginScreenComponent } from '../screens/index'
import { registerScreen, makeScreen2 } from '../screens/Screen2'
import Icon from 'react-native-vector-icons/Ionicons'

const LoginAppComponent: React.SFC = () => {
  return (
    <Services>
      <LoginScreenComponent />
    </Services>
  )
}

const messages = defineMessages({
  LoginApp: {
    id: 'App.native.LoginApp',
    defaultMessage: 'hello'
  }
})

const LoginApp = makeScreen2({ getTitle: () => messages.LoginApp })(LoginAppComponent)
registerScreen(LoginApp)

const iconImages = {
  'ios-settings': 0,
}

const initLogin = async () => {
  console.log('initLogin')
  await Promise.all(
    Object.keys(iconImages)
    .map(async name => {
      iconImages[name] = await Icon.getImageSource(name)
    })
  )

  console.log('initLogin done', iconImages)

  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            drawBehind: true,
            translucent: true,
          }
        },
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: LoginApp.screenID,
                    options: {
                      topBar: {
                        drawBehind: true,
                        // transparent: true,
                        translucent: true,
                        // blur: true,
                        title: {
                          text: 'hi2',
                        },
                        // searchBar: true,
                      },
                    }
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Tab 1',
                  icon: iconImages['ios-settings'],
                },
                topBar: {
                  title: {
                    // text: 'hi'
                  },
                  largeTitle: {
                    visible: true
                  },
                }
              }
            }
          },
          {
            component: {
              name: LoginApp.screenID,
              options: {
                bottomTab: {
                  text: 'Tab 2',
                  icon: iconImages['ios-settings'],
                  // icon: require('../images/one.png')
                },
                topBar: {
                  visible: true,
                  title: {
                    text: 'hi'
                  }
                }
              }
            },
          }
        ]
      }
    }
  })
}

// registerScreen(LoginScreen)
Navigation.events().registerAppLaunchedListener(initLogin)
