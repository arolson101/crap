import * as React from 'react';
import { Platform } from 'react-native';
import { Helmet } from 'react-helmet';

export const FontIcons: React.SFC = ({children}) => (
  <>
    {Platform.OS === 'web' &&
      <Helmet>
        <style type="text/css">{`
          @font-face {
            src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')});
            font-family: FontAwesome;
          }
          @font-face {
            src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')});
            font-family: Material Icons;
          }
        `}
        </style>
      </Helmet>
    }
    {children}
  </>
);
