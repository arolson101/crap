require('node-libs-react-native/globals');
import Expo from 'expo';
import Root from './src';
import React from 'react';
import { View } from 'react-native';

// we don't want this to require transformation
class AwakeInDevApp extends React.Component {
  render() {
    return React.createElement(
      View,
      {
        style: {
          flex: 1,
        },
      },
      React.createElement(Root, this.props),
      React.createElement(process.env.NODE_ENV === 'development' ? Expo.KeepAwake : View)
    );
  }
}

Expo.registerRootComponent(AwakeInDevApp);
