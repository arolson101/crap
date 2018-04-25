import glamorous, { ThemeProvider } from 'glamorous-native';
import * as React from 'react';

export { glamorous };

export interface Theme {
  controlFontSize: number;
  controlFontColor: string;

  labelWidth: number;
  labelFontSize: number;
  labelColor: string;

  errorTextColor: string;

  boxBorderColor: string;
  boxBorderWidth: number;

  boxBorderColorError: string;

  rowMargin: number;
}

export interface ThemeProp {
  theme: Theme;
}

const defaultTheme: Theme = {
  controlFontSize: 20,
  controlFontColor: 'black',

  labelWidth: 150,
  labelFontSize: 16,
  labelColor: '#404040',

  errorTextColor: 'red',

  boxBorderColor: 'silver',
  boxBorderWidth: 1,

  boxBorderColorError: 'red',

  rowMargin: 10,
};

export const AppThemeProvider: React.SFC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider>
);
