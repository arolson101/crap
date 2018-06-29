import { Body, Container } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Platform, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationParams, NavigationScreenComponent } from 'react-navigation'
import HeaderButtons from 'react-navigation-header-buttons'
import { ctx } from '../App/ctx'

export type ScreenProps = ctx.Intl

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

  return <P extends object>(Component: React.ComponentType<P>) => {
    const nav: ScreenComponent<P> = ((props) => (
      <Container>
        <Body>
          <Component {...props} {...moreProps} />
        </Body>
      </Container>
    )) as NavigationScreenComponent<NavigationParams, {}, P> as any

    nav.navigationOptions = ({ navigation, screenProps }) => {
      const { intl } = screenProps as ScreenProps

      const headerLeft = (params.cancelButton && !navigation.state.index) ? ({
        headerLeft: (
          <HeaderButtons IconComponent={IconComponent} iconSize={platform.iconHeaderSize} color={platform.toolbarBtnColor}>
            <HeaderButtons.Item
              title='cancel'
              iconName={Platform.OS === 'android' ? 'arrow-back' : undefined}
              onPress={() => navigation.goBack(null)}
            />
          </HeaderButtons>
        )
      }) : ({})

      const headerRight = (params.addButton || params.saveButton) ? ({
        headerRight: (
          <HeaderButtons IconComponent={IconComponent} iconSize={platform.iconHeaderSize} color={platform.toolbarBtnColor}>
            {params.addButton &&
              <HeaderButtons.Item
                title='add'
                iconName={Platform.OS === 'android' ? 'add' : 'ios-add'}
                onPress={() => onAdd()}
              />
            }
            {params.saveButton &&
              <HeaderButtons.Item
                title='save'
                iconName={Platform.OS === 'android' ? 'check' : undefined}
                onPress={() => onSave()}
              />
            }
          </HeaderButtons>
        )
      }) : ({})

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
