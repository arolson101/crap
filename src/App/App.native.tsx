import { Root, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl'
import { Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, NavigationContainerComponent, NavigationRouteConfigMap, NavigationScreenConfig, NavigationScreenConfigProps, NavigationScreenOptions, TabNavigatorConfig } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppDbProvider } from '../db/index'
import * as modals from '../modals/index'
import { paths } from '../nav'
import { nativeActions } from '../redux/actions/nativeActions'
import { ReduxProvider } from '../redux/index'
import * as screens from '../screens/index'
import { ScreenComponent, ScreenProps } from '../screens/Screen'
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

const modalStack = createStackNavigator({
  [paths.bankCreate]: modals.BankModal,
  [paths.bankEdit]: modals.BankModal,
  [paths.accountCreate]: modals.AccountModal,
  [paths.accountEdit]: modals.AccountModal,
})
modalStack.displayName = 'modalStack'

const appStack = createStackNavigator(
  {
    main: mainStack,
    [paths.modal]: modalStack,
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

const App: React.SFC = () => {
  return (
    <LoadFonts>
      <ReduxProvider>
        <IntlProvider locale='en' textComponent={Text}>
          <AppDbProvider>
            <Root>
              <AppNavigator />
            </Root>
          </AppDbProvider>
        </IntlProvider>
      </ReduxProvider>
    </LoadFonts>
  )
}

export default App
