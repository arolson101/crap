import * as React from 'react'
import { LoginForm } from '../forms/LoginForm'
import { CenteredContent } from '../components'
import { Button, View, Text } from 'react-native'
import { createBottomTabNavigator, createStackNavigator, NavigationInjectedProps, NavigationScreenConfigProps } from 'react-navigation'

// export const LoginPage: React.SFC = (props) => {
//   return (
//     <CenteredContent>
//       <LoginForm />
//     </CenteredContent>
//   )
// }

class HomeScreen extends React.Component<NavigationInjectedProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const params = navigation.state.params || {}

    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title='Info'
        />
      ),
      /* the rest of this config is unchanged */
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title='Go to Details'
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    )
  }
}

class ModalScreen extends React.Component<NavigationInjectedProps> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='Dismiss'
        />
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

import Ionicons from 'react-native-vector-icons/Ionicons'

const TabStack = createBottomTabNavigator(
  {
    Main: MainStack,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName: string
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName!} size={25} color={tintColor!} />
      },
    }),
  }
)

export const LoginPage = createStackNavigator(
  {
    Tabs: {
      screen: TabStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)
