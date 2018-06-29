import { ThemeProvider } from 'glamorous-native'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, NavigationContainerComponent, NavigationRouteConfigMap, NavigationScreenConfig, NavigationScreenConfigProps, NavigationScreenOptions, TabNavigatorConfig } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { connect } from 'react-redux'
import { ctx } from '../App/ctx'
import * as modals from '../modals'
import { paths } from '../nav'
import { nativeActions } from '../redux/actions/nativeActions'
import * as screens from '../screens'
import { LoadFonts } from './LoadFonts'
import { defaultTheme } from './Theme'

export type ScreenProps = ctx.Intl

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
  const primaryScreen = routeConfigMap[initialRouteName]
  const stack = createStackNavigator(routeConfigMap, { initialRouteName })
  stack.navigationOptions = ({ screenProps }: NavigationScreenConfigProps) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const name = icon(focused)
      const IconClass = Platform.select({
        android: MaterialIcons,
        ios: Ionicons,
      })
      return <IconClass color={tintColor!} size={25} name={name} />
    },
    tabBarLabel: (screenProps as ScreenProps).intl.formatMessage(primaryScreen.title),
  }) as NavigationScreenConfig<NavigationScreenOptions>
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
    ios: `ios-albums${focused ? '' : '-outline'}`,
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
    Accounts: screens.AccountsScreen
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
    initialRouteName: paths.root.home,
    order: [
      paths.root.home,
      paths.root.budgets,
      paths.root.accounts
    ],
    barStyle: {
      backgroundColor: platform.tabActiveBgColor
    },
    activeTintColor: platform.tabBarActiveTextColor,
    inactiveTintColor: platform.tabBarTextColor,
  } as TabNavigatorConfig
)

const modalsStack = createStackNavigator(
  {
    main: mainStack,
    [paths.modal.accountCreate]: modals.BankForm
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'main',
  }
)

const loginStack = createStackNavigator({
  Login: screens.LoginScreen
}, { headerMode: 'none' })

const AuthStack = createSwitchNavigator({
  [paths.login]: loginStack,
  [paths.app]: modalsStack,
})

interface TopNavigatorComponentProps {
  setTopNavigator: (topNavigator: NavigationContainerComponent) => any
}

const TopNavigatorComponent: React.SFC<TopNavigatorComponentProps> = ({ setTopNavigator }, context) => {
  const { intl } = context as ctx.Intl
  const screenProps: ScreenProps = ({ intl })
  return (
    <AuthStack screenProps={screenProps} ref={setTopNavigator} />
  )
}
TopNavigatorComponent.contextTypes = ctx.intl

const TopNavigator = connect(
  null,
  ({
    setTopNavigator: nativeActions.setTopNavigator,
  })
)(TopNavigatorComponent)
TopNavigator.displayName = 'TopNavigator'

const App: React.SFC = () => {
  return (
    <LoadFonts>
      <ThemeProvider theme={defaultTheme}>
        <TopNavigator />
      </ThemeProvider>
    </LoadFonts>
  )
}

export default App
