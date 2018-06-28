import { Body, Button, Container, Header, Icon, Left, Right, Title, Text } from 'native-base'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { NavigationInjectedProps, NavigationScreenConfig, NavigationScreenOptions, withNavigation } from 'react-navigation'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../redux/actions/index';

interface Props {
  title: FormattedMessage.MessageDescriptor,
}

interface ConnectedProps {
  navBack: () => any
}

import platform from 'native-base/dist/src/theme/variables/platform'
import { StyleSheet } from 'react-native';
import { ScreenProps } from '../App/App.native';
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
  headerTintColor: {
  }
})

export class ScreenComponent extends React.Component<Props & NavigationInjectedProps & ConnectedProps> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({ navigation, screenProps }) => {
    console.log('screen')
    const { intl } = screenProps as ScreenProps
    const title: FormattedMessage.MessageDescriptor | undefined = navigation.getParam('title')
    const navBack: (() => any) | undefined = navigation.getParam('navBack')
    return ({
      // header: ({ state }) => <Text>left</Text>,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitleStyle: styles.headerBackTitleStyle,
      headerTintColor: platform.toolbarBtnColor,
      headerTitle: navigation.state.routeName // title && intl.formatMessage(title),
      // headerLeft: <Text>left</Text>,
      // headerLeft: (
      //   <Left>
      //     {navigation.state.index > 0 &&
      //       <Button transparent onPress={navBack}>
      //         <Icon name='arrow-back' />
      //       </Button>
      //     }
      //   </Left>
      // ),
      // headerTitle: (
      //   <Body>
      //       {title &&
      //         <FormattedMessage {...title}>
      //           {txt =>
      //             <Title>{txt}</Title>
      //           }
      //         </FormattedMessage>
      //       }
      //     </Body>
      // ),
      // header: (
      //   <Header>
      //     <Left>
      //       {navigation.state.index > 0 &&
      //         <Button transparent onPress={navBack}>
      //           <Icon name='arrow-back' />
      //         </Button>
      //       }
      //     </Left>
      //     <Body>
      //       {title &&
      //         <FormattedMessage {...title}>
      //           {txt =>
      //             <Title>{txt}</Title>
      //           }
      //         </FormattedMessage>
      //       }
      //     </Body>
      //     <Right />
      //   </Header>
      // )
    })
  }

  componentDidMount () {
    this.props.navigation.setParams(this.props)
  }

  render () {
    return (
      <Container>
        <Body>
          {this.props.children}
        </Body>
      </Container>
    )
  }
}

export const Screen = compose(
  withNavigation,
  connect(null, { navBack: actions.navBack })
)(ScreenComponent)

export const fixScreen = (Component: React.ComponentType) => {
  (Component as any).navigationOptions = ScreenComponent.navigationOptions
  return Component
}
