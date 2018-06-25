import * as React from 'react'
import { LoginForm } from '../forms/LoginForm'
import { CenteredContent } from '../components'
import { Button, View, Text } from 'react-native'
import { HomeScreen } from './HomeScreen'
import { BudgetsScreen } from './BudgetsScreen'
import { AccountsScreen } from './AccountsScreen'
import { createBottomTabNavigator, createStackNavigator, NavigationInjectedProps, NavigationScreenConfigProps } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// })

// const BudgetsStack = createStackNavigator({
//   Budgets: BudgetsScreen
// })

// const AccountsStack = createStackNavigator({
//   Accounts: AccountsScreen
// })

// const TabStack = createBottomTabNavigator(
//   {
//     Home: HomeStack,
//     Budgets: BudgetsStack,
//     Accounts: AccountsStack,
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state
//         let iconName: string
//         if (routeName === 'Home') {
//           iconName = `ios-home${focused ? '' : '-outline'}`
//         } else if (routeName === 'Budgets') {
//           iconName = `ios-albums${focused ? '' : '-outline'}`
//         } else if (routeName === 'Accounts') {
//           iconName = `ios-paper${focused ? '' : '-outline'}`
//         }

//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return <Ionicons name={iconName!} size={25} color={tintColor!} />
//       },

//     }),
//   }
// )
// // TabStack.navigationOptions = {
// //   // Hide the header from AppNavigator stack
// //   header: null,
// // }

// TabStack.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
//   let { routeName } = navigation.state.routes[navigation.state.index]

//   // You can do whatever you like here to pick the title based on the route name
//   let headerTitle = routeName + '!'

//   return {
//     headerTitle,
//   }
// }

// export const RootPage2 = createStackNavigator(
//   {
//     Tabs: {
//       screen: TabStack,
//     },
//     // MyModal: {
//     //   screen: ModalScreen,
//     // },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   }
// )

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'settings',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

let HomeStack = createStackNavigator({ HomeScreen });
let SettingsStack = createStackNavigator({ SettingsScreen });

const bt = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
})

export const RootPage = bt
