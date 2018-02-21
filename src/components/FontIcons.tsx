import * as React from 'react';
import { Font } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

export class FontIcons extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    const font = (MaterialIcons as any).font;
    await Font.loadAsync({'Material Icons': font.material});

    this.setState({fontLoaded: true});
  }
  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return <>{this.props.children}</>;
  }
}
