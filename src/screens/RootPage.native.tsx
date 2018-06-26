import * as React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Text, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createStackNavigator, NavigationContainerComponent } from 'react-navigation'
import { AccountsScreen } from './AccountsScreen'
import { BudgetsScreen } from './BudgetsScreen'
import { HomeScreen } from './HomeScreen'
import { ctx } from '../App/ctx'
import { navActions } from '../redux/actions/navActions.native'
import { paths } from '../nav';

type ScreenProps = ctx.Intl

const messages = defineMessages({
  [paths.root.home]: {
    id: 'RootPage.native.home',
    defaultMessage: 'Home'
  },
  [paths.root.budgets]: {
    id: 'RootPage.native.budgets',
    defaultMessage: 'Budgets'
  },
  [paths.root.accounts]: {
    id: 'RootPage.native.accounts',
    defaultMessage: 'Accounts'
  },
})

const HeaderIcon: React.SFC<{routeName: string, focused: boolean, size: number, color: string | null}> = (props) => {
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
      return <Ionicons color={color!} size={size} name={iosIconNames[routeName]}/>

    case 'android':
      return <MaterialIcons color={color!} size={size} name={androidIconNames[routeName]}/>
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
          return <HeaderIcon size={25} color={tintColor} routeName={routeName} focused={focused}/>
        },

        title
      })
    }
  }
)

const ModalsStack = createStackNavigator(
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

interface RootPageProps {
  setTopNavigator: (topNavigator: NavigationContainerComponent) => any
}

const RootPageComponent: React.SFC<RootPageProps> = ({setTopNavigator}, context) => {
  const { intl } = context as ctx.Intl
  const screenProps: ScreenProps = ({
    intl
  })
  return (
    <ModalsStack screenProps={screenProps} ref={setTopNavigator} />
  )
}
RootPageComponent.contextTypes = ctx.intl

export const RootPage = connect(
  null,
  ({
    setTopNavigator: navActions.setTopNavigator,
  })
)(RootPageComponent)
RootPage.displayName = 'RootPage'
