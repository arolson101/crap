import { Body, Container } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet } from 'react-native'
import { NavigationParams, NavigationScreenComponent } from 'react-navigation'
import { ScreenProps } from '../App/App.native'

interface Params {
  title: FormattedMessage.MessageDescriptor,
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

  return <P extends object>(Component: React.ComponentType<P>) => {
    const nav: ScreenComponent<P> = ((props) => (
      <Container>
        <Body>
          <Component {...props} />
        </Body>
      </Container>
    )) as NavigationScreenComponent<NavigationParams, {}, P> as any
    nav.navigationOptions = ({ navigation, screenProps }) => {
      const { intl } = screenProps as ScreenProps
      return ({
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleStyle: styles.headerBackTitleStyle,
        headerTintColor: platform.toolbarBtnColor,
        headerTitle: intl.formatMessage(title),
      })
    }
    nav.title = title
    return nav
  }
}
