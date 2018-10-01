import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormattedMessage, InjectedIntlProps } from 'react-intl'
import { Platform, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationParams, NavigationScreenComponent, SafeAreaView } from 'react-navigation'
import HeaderButtons from 'react-navigation-header-buttons'

export type ScreenProps = InjectedIntlProps

export type TitleFcn<T> = (params: T) => string | FormattedMessage.MessageDescriptor

export interface AddButtonProps {
  setAdd: (callback: () => any) => any
}

export interface SaveButtonProps {
  setSave: (callback: () => any) => any
}

export interface EditButtonProps {
  setEdit: (callback: () => any) => any
}

interface Params<T> {
  title: TitleFcn<T>,
  addButton?: boolean
  saveButton?: boolean
  cancelButton?: boolean
  editButton?: boolean
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

export type ScreenComponent<T = {}, P = any> = NavigationScreenComponent<NavigationParams, {}, P>
  & { title: TitleFcn<T> }

export const makeScreen = <T extends {}>(params: Params<T>) => {
  let onAdd = () => { console.warn('no add function') }
  let onSave = () => { console.warn('no save function') }
  let onEdit = () => { console.warn('no edit function') }
  const moreProps = {
    setAdd: params.addButton ? ((addfcn: () => any) => { onAdd = addfcn }) : null,
    setSave: params.saveButton ? ((saveFcn: () => any) => { onSave = saveFcn }) : null,
    setEdit: params.editButton ? ((editFcn: () => any) => { onEdit = editFcn }) : null,
  }

  const IconComponent = Platform.OS === 'ios' ? Ionicons : MaterialIcons

  return <P extends object>(Component: React.ComponentType<P>) => {
    const nav: ScreenComponent<T, P> = ((props) => (
      <SafeAreaView style={{ flex: 1, backgroundColor: platform.brandLight }}>
        {/* <Container style={{flex: 2}}> */}
        {/* <Fab
          direction='up'
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position='bottomRight'
        >
          <Icon name='share' />
        </Fab> */}
        {/* <Content> */}
        <Component
          {...props}
          {...moreProps}
          {...props.navigation.state.params}
        />
        {/* </Content> */}
        {/* </Container> */}
      </SafeAreaView>
    )) as NavigationScreenComponent<T, {}, P> as any

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

      const headerRight = (params.addButton || params.saveButton || params.editButton) ? ({
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
            {params.editButton &&
              <HeaderButtons.Item
                title='edit'
                onPress={() => onEdit()}
              />
            }
          </HeaderButtons>
        )
      }) : ({})

      const title = params.title((navigation.state.params || {}) as T)
      const headerTitle = (typeof title === 'string') ? title : intl.formatMessage(title)

      return ({
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleStyle: styles.headerBackTitleStyle,
        headerTintColor: platform.toolbarBtnColor,
        headerTitle,
        ...headerLeft,
        ...headerRight,
      })
    }
    nav.title = params.title
    nav.displayName = `Screen(${Component.displayName || Component.name})`
    return nav
  }
}
