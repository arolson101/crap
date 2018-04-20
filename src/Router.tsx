import * as React from 'react';
import { NativeRouter } from 'react-router-native';

export const Router: React.SFC = ({children}) => (
  <NativeRouter>
    {children}
  </NativeRouter>
);
