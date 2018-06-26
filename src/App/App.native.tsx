import { ThemeProvider } from 'glamorous-native'
import * as React from 'react'
import { defineMessages } from 'react-intl'
import { Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createStackNavigator, NavigationContainerComponent, createSwitchNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { ctx } from '../App/ctx'
import { paths } from '../nav'
import { navActions } from '../redux/actions/navActions.native'
import { AccountsScreen, BudgetsScreen, HomeScreen, LoginScreen } from '../screens'
import { LoadFonts } from './LoadFonts'
import { defaultTheme } from './Theme'

type ScreenProps = ctx.Intl

const messages = defineMessages({
  [paths.root.home]: {
    id: 'App.native.home',
    defaultMessage: 'Home'
  },
  [paths.root.budgets]: {
    id: 'App.native.budgets',
    defaultMessage: 'Budgets'
  },
  [paths.root.accounts]: {
    id: 'App.native.accounts',
    defaultMessage: 'Accounts'
  },
})

const HeaderIcon: React.SFC<{ routeName: string, focused: boolean, size: number, color: string | null }> = (props) => {
  const { routeName, size, focused, color } = props
  const iosIconNames = {
    [paths.root.home]: `ios-home${focused ? '' : '-outline'}`,
    [paths.root.budgets]: `ios-albums${focused ? '' : '-outline'}`,
    [paths.root.accounts]: `ios-paper${focused ? '' : '-outline'}`,
  }
  const androidIconNames = {
    [paths.root.home]: `home`,
    [paths.root.budgets]: `receipt`,
    [paths.root.accounts]: `account-balance`,
  }

  switch (Platform.OS) {
    default:
    case 'ios':
      return <Ionicons color={color!} size={size} name={iosIconNames[routeName]} />

    case 'android':
      return <MaterialIcons color={color!} size={size} name={androidIconNames[routeName]} />
  }
}

const homeStack = createStackNavigator({
  Home: HomeScreen,
})

const budgetsStack = createStackNavigator({
  Budgets: BudgetsScreen
})

const accountsStack = createStackNavigator({
  Accounts: AccountsScreen
})

const TabStack = createBottomTabNavigator(
  {
    [paths.root.home]: homeStack,
    [paths.root.budgets]: budgetsStack,
    [paths.root.accounts]: accountsStack,
  },
  {
    navigationOptions: ({ navigation, screenProps }) => {
      const { intl } = screenProps as ScreenProps
      const { routeName } = navigation.state
      const title = intl.formatMessage(messages[routeName])
      return ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state
          return <HeaderIcon size={25} color={tintColor} routeName={routeName} focused={focused} />
        },

        title
      })
    }
  }
)

const modalsStack = createStackNavigator(
  {
    Tabs: {
      screen: TabStack,
    },
    // MyModal: {
    //   screen: ModalScreen,
    // },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const loginStack = createStackNavigator({
  Login: LoginScreen
})

const AuthStack = createSwitchNavigator({
  [paths.login]: loginStack,
  [paths.app]: modalsStack,
})

interface RootPageProps {
  setTopNavigator: (topNavigator: NavigationContainerComponent) => any
}

const TopNavigatorComponent: React.SFC<RootPageProps> = ({ setTopNavigator }, context) => {
  const { intl } = context as ctx.Intl
  const screenProps: ScreenProps = ({
    intl
  })
  return (
    <AuthStack screenProps={screenProps} ref={setTopNavigator} />
  )
}
TopNavigatorComponent.contextTypes = ctx.intl

const TopNavigator = connect(
  null,
  ({
    setTopNavigator: navActions.setTopNavigator,
  })
)(TopNavigatorComponent)
TopNavigator.displayName = 'RootPage'

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
