import { Root, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { InjectedIntlProps, injectIntl, IntlProvider, defineMessages, FormattedDate, FormattedMessage } from 'react-intl'
import { Platform, SafeAreaView, View } from 'react-native'
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

const Services: React.SFC = ({ children, ...props }) => {
  console.log('---services', props)
  return (
    // <LoadFonts>
    <ReduxProvider>
      <IntlProvider locale='en' textComponent={Text}>
        {/* <Root> */}
        {/* <SafeAreaView> */}
        {children}
        {/* </SafeAreaView> */}
        {/* </Root> */}
      </IntlProvider>
    </ReduxProvider>
    // </LoadFonts>
  )
}
Services.displayName = 'Services'

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
import Icon from 'react-native-vector-icons/Ionicons'
import { registerScreen, makeScreen2, NavScreen } from '../screens/Screen2'
import { LayoutRoot, LayoutComponent, LayoutStackChildren } from 'react-native-navigation/lib/dist/interfaces/Layout'
import { Options } from 'react-native-navigation/lib/dist/interfaces/Options'
import hoistStatics from 'hoist-non-react-statics'

class LoginAppComponent extends React.Component<{ componentId: string }> {
  render() {
    return (
      // <NavContext.Provider value={this.props.componentId}>
      //   <Services>
      <LoginScreen />
      //   </Services>
      // </NavContext.Provider>
    )
  }

  static displayName = 'LoginAppComponent'
}

const messages = defineMessages({
  LoginApp: {
    id: 'App.native.LoginApp',
    defaultMessage: 'login'
  }
})

// const LoginApp = makeScreen2({ getTitle: () => messages.LoginApp })(LoginAppComponent)
// // registerScreen(LoginApp)
// Navigation.registerComponentWithRedux(LoginApp.screenID, () => LoginApp, Services, true)

interface Params {
  getTitle: () => FormattedMessage.MessageDescriptor
}

const registerNavComponent = <T extends {}>(Component: React.ComponentType<T>, { getTitle }: Params) => {
  if (!Component.displayName) {
    throw new Error(`no displayName on component`)
  }

  const SetTitleComponent = injectIntl<T>(
    class extends React.Component<T & InjectedIntlProps> {
      componentDidMount() {
        console.log('mounted', this.props)
        const { intl: { formatMessage } } = this.props
        const { componentId } = this.props as any
        Navigation.mergeOptions(componentId, {
          topBar: {
            title: {
              text: formatMessage(getTitle())
            },
            // rightButtons: [
            //   {
            //     id: 'foo',
            //     icon: iconImages['ios-share-outline'],
            //     testID: 'foo',
            //   }
            // ],
            largeTitle: {
              // visible: true
            }
          }
        })
      }

      render() {
        return (
          <Services>
            <Component {...this.props} />
          </Services>
        )
      }

      static displayName = `navComponent(${Component.displayName || Component.name})`
    }
  )

  const ServiceComponent: React.SFC<T> = (props) => (
    <Services>
      <SetTitleComponent {...props}/>
    </Services>
  )
  ServiceComponent.displayName = `ServiceComponent(${Component.displayName || Component.name})`

  const newComponent = hoistStatics(ServiceComponent, Component)
  Navigation.registerComponent(Component.displayName, () => newComponent)
}

registerNavComponent(LoginAppComponent, { getTitle: () => messages.LoginApp })

const rnnComponent = (screen: React.ComponentType): LayoutStackChildren => ({
  component: {
    name: screen.displayName!,
    options: {
      topBar: {
        drawBehind: true,
        translucent: true,
        title: {
          text: 'override me',
        },
        // searchBar: true,
      },
    }
  }
})

const componentIds = {
  login: 'login',
}

const loginRoot = (): LayoutRoot => ({
  root: {
    component: {
      id: componentIds.login,
      name: LoginAppComponent.displayName!,
    }
  }
})

Navigation.setDefaultOptions({
  bottomTabs: {
    backgroundColor: platform.tabActiveBgColor
  },

  bottomTab: {
    iconColor: platform.tabBarTextColor,
    textColor: platform.tabBarTextColor,
    selectedIconColor: platform.tabBarActiveTextColor,
    selectedTextColor: platform.tabBarActiveTextColor,
    fontSize: platform.tabBarTextSize,
    fontFamily: platform.fontFamily,
  }
} as Options)

const appTab = (text: string, component: React.ComponentType) => ({
  component: {
    name: component.displayName || component.name,
    options: {
      bottomTab: {
        text,
        icon: iconImages['ios-share-outline'],
      }
    }
  },
})

const appRoot = () => ({
  root: {
    bottomTabs: {
      children: [
        appTab('app tab 1', LoginAppComponent),
        appTab('app tab 2', LoginAppComponent),
      ],
    }
  }
})

const iconImages = {
  'ios-share-outline': 0,
}

const initLogin = async () => {
  console.log('initLogin')
  await Promise.all(
    Object.keys(iconImages)
    .map(async name => {
      iconImages[name] = await Icon.getImageSource(name, platform.iconHeaderSize)
    })
  )

  console.log('initLogin done', iconImages)
  // console.log('initLogin')
  Navigation.setRoot(appRoot())
  // Navigation.setRoot({
  //   root: {
  //     bottomTabs: {
  //       options: {
  //         bottomTabs: {
  //           drawBehind: true,
  //           translucent: true,
  //         }
  //       },
  //       children: [
  //         {
  //           stack: {
  //             children: [
  //               {
  //                 component: {
  //                   name: LoginAppComponent.displayName,
  //                   options: {
  //                     topBar: {
  //                       drawBehind: true,
  //                       // transparent: true,
  //                       translucent: true,
  //                       // blur: true,
  //                       // title: {
  //                       //   text: 'hi2',
  //                       // },
  //                       // searchBar: true,
  //                     },
  //                   }
  //                 },
  //               },
  //             ],
  //             options: {
  //               bottomTab: {
  //                 text: 'Tab 1',
  //                 icon: iconImages['ios-share-outline'],
  //               },
  //               topBar: {
  //                 title: {
  //                   // text: 'hi'
  //                 },
  //                 largeTitle: {
  //                   visible: true
  //                 },
  //               }
  //             }
  //           }
  //         },
  //         {
  //           component: {
  //             name: LoginAppComponent.displayName,
  //             options: {
  //               bottomTab: {
  //                 text: 'Tab 2',
  //                 icon: iconImages['ios-share-outline'],
  //               },
  //               topBar: {
  //                 visible: true,
  //                 title: {
  //                   text: 'hi'
  //                 }
  //               }
  //             }
  //           },
  //         }
  //       ]
  //     }
  //   }
  // })
}

// registerScreen(LoginScreen)
Navigation.events().registerAppLaunchedListener(initLogin)
