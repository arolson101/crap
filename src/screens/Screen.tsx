import { Body, Button, Container, Header, Icon, Left, Right, Title } from 'native-base'
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

export class ScreenComponent extends React.Component<Props & NavigationInjectedProps & ConnectedProps> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({ navigation }) => {
    console.log('screen')
    const title: FormattedMessage.MessageDescriptor | undefined = navigation.getParam('title')
    const navBack: (() => any) | undefined = navigation.getParam('navBack')
    return ({
      header: (
        <Header>
          <Left>
            {navigation.state.index > 0 &&
              <Button transparent onPress={navBack}>
                <Icon name='arrow-back' />
              </Button>
            }
          </Left>
          <Body>
            {title &&
              <FormattedMessage {...title}>
                {txt =>
                  <Title>{txt}</Title>
                }
              </FormattedMessage>
            }
          </Body>
          <Right />
        </Header>
      )
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
