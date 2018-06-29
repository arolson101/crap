import { Body, Container, Icon } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationParams, NavigationScreenComponent } from 'react-navigation'
import HeaderButtons from 'react-navigation-header-buttons'
import { ScreenProps } from '../App/App.native'

export interface AddButtonProps {
  setAdd: (callback: () => any) => any
}

interface Params {
  title: FormattedMessage.MessageDescriptor,
  addButton?: string
}

const styles = StyleSheet.create({
  headerStyle: {
    // color: platform.toolbarBtnColor,
    backgroundColor: platform.toolbarDefaultBg,
    // height: platform.toolbarHeight,
  },
  headerTitleStyle: {
    color: platform.toolbarBtnTextColor,
  },
  headerBackTitleStyle: {
    // height: platform.iconHeaderSize,
  },
})

// headerLeft: (
//   <HeaderButtons left iconSize={23} color={platform.toolbarBtnColor}>
//     <HeaderButtons.Item title="back" onPress={navBack} />
//   </HeaderButtons>
// )

export type ScreenComponent<P = any> = NavigationScreenComponent<NavigationParams, {}, P>
  & { title: FormattedMessage.MessageDescriptor }

export const makeScreen = (params: Params) => {
  const { title } = params
  console.log('makeScreen')
  let onAdd = () => { console.warn('no add function') }
  const setAdd = (addfcn: () => any ) => { onAdd = addfcn }
  const moreProps = params.addButton ? { setAdd } : {}

  const IconComponent = Platform.OS === 'ios' ? Ionicons : MaterialIcons
  const addIconName = Platform.OS === 'ios' ? 'ios-add' : 'add'

  return <P extends object>(Component: React.ComponentType<P>) => {
    const nav: ScreenComponent<P> = ((props) => (
      <Container>
        <Body>
          <Component {...props} {...moreProps} />
        </Body>
      </Container>
    )) as NavigationScreenComponent<NavigationParams, {}, P> as any

    const addNavigationOptions = params.addButton ? ({
      headerRight: (
        <HeaderButtons IconComponent={IconComponent} iconSize={platform.iconHeaderSize} color={platform.toolbarBtnColor}>
          <HeaderButtons.Item title='add' iconName={addIconName} onPress={() => onAdd()} />
        </HeaderButtons>
      )
    }) : ({})

    nav.navigationOptions = ({ navigation, screenProps }) => {
      const { intl } = screenProps as ScreenProps
      return ({
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleStyle: styles.headerBackTitleStyle,
        headerTintColor: platform.toolbarBtnColor,
        headerTitle: intl.formatMessage(title),
        ...addNavigationOptions,
      })
    }
    nav.title = title
    return nav
  }
}
