import * as React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Text, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { AccountsScreen } from './AccountsScreen'
import { BudgetsScreen } from './BudgetsScreen'
import { HomeScreen } from './HomeScreen'
import { ctx } from '../App/ctx'

type ScreenProps = ctx.Intl

const messages = defineMessages({
  home: {
    id: 'RootPage.native.home',
    defaultMessage: 'Home'
  },
  budgets: {
    id: 'RootPage.native.budgets',
    defaultMessage: 'Budgets'
  },
  accounts: {
    id: 'RootPage.native.accounts',
    defaultMessage: 'Accounts'
  },
})

const HeaderIcon: React.SFC<{routeName: string, focused: boolean, size: number, color: string | null}> = (props) => {
  const { routeName, size, focused, color } = props
  const iosIconNames = {
    home: `ios-home${focused ? '' : '-outline'}`,
    budgets: `ios-albums${focused ? '' : '-outline'}`,
    accounts: `ios-paper${focused ? '' : '-outline'}`,
  }
  const androidIconNames = {
    home: `home`,
    budgets: `receipt`,
    accounts: `account-balance`,
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
    home: homeStack,
    budgets: budgetsStack,
    accounts: accountsStack,
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

export const RootPage: React.SFC = (props, context) => {
  const { intl } = context as ctx.Intl
  const screenProps: ScreenProps = ({
    intl
  })
  return <ModalsStack screenProps={screenProps} />
}
RootPage.contextTypes = ctx.intl
