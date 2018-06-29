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

export interface SaveButtonProps {
  setSave: (callback: () => any) => any
}

interface Params {
  title: FormattedMessage.MessageDescriptor,
  addButton?: boolean
  saveButton?: boolean
  cancelButton?: boolean
}

const styles = StyleSheet.create({
  headerStyle: {
    // color: platform.toolbarBtnColor,
    backgroundColor: platform.toolbarDefaultBg,
    // height: platform.toolbarHeight,
  },
  headerTitleStyle: {
    color: platform.titleFontColor,
    fontSize: platform.titleFontSize,
    fontFamily: platform.titleFontfamily,
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
  let onAdd = () => { console.warn('no add function') }
  let onSave = () => { console.warn('no save function') }
  const moreProps = {
    setAdd: params.addButton ? ((addfcn: () => any) => { onAdd = addfcn }) : null,
    setSave: params.saveButton ? ((saveFcn: () => any) => { onSave = saveFcn }) : null,
  }

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

    const headerLeft = (params.cancelButton) ? ({
      headerLeft: (
        <HeaderButtons IconComponent={IconComponent} iconSize={platform.iconHeaderSize} color={platform.toolbarBtnColor}>
          {Platform.OS === 'android' &&
            <HeaderButtons.Item title='add' iconName='close' onPress={() => console.warn('close')} />
          }
          {Platform.OS === 'ios' &&
            <HeaderButtons.Item title='close' onPress={() => console.warn('close')} />
          }
        </HeaderButtons>
      )
    }) : ({})

    const headerRight = (params.addButton || params.saveButton) ? ({
      headerRight: (
        <HeaderButtons IconComponent={IconComponent} iconSize={platform.iconHeaderSize} color={platform.toolbarBtnColor}>
          {params.addButton &&
            <HeaderButtons.Item title='add' iconName={addIconName} onPress={() => onAdd()} />
          }
          {params.saveButton &&
            <HeaderButtons.Item title='save' onPress={() => onSave()} />
          }
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
        ...headerLeft,
        ...headerRight,
      })
    }
    nav.title = title
    nav.displayName = `Screen(${Component.displayName})`
    return nav
  }
}
