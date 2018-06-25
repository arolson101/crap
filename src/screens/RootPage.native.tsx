import * as React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { AccountsScreen } from './AccountsScreen'
import { BudgetsScreen } from './BudgetsScreen'
import { HomeScreen } from './HomeScreen'

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

const iconNames = (focused: boolean) => ({
  home: `ios-home${focused ? '' : '-outline'}`,
  budgets: `ios-albums${focused ? '' : '-outline'}`,
  accounts: `ios-paper${focused ? '' : '-outline'}`,
})

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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName: string = iconNames(focused)[routeName]
        return <Ionicons name={iconName} size={25} color={tintColor!} />
      },

      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        return (
          <Text style={{ color: tintColor! }}>
            <FormattedMessage {...messages[routeName]} />
          </Text>
        )
      }
    }),
  }
)

export const RootPage = createStackNavigator(
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
