
export interface Theme {
  appBannerFontSize: number
  appBannerMargin: number

  welcomeFontSize: number
  welcomeMargin: number

  controlFontSize: number
  controlFontColor: string

  labelWidth: number
  labelFontSize: number
  labelColor: string

  errorTextColor: string

  boxBorderColor: string
  boxBorderWidth: number

  boxBorderColorError: string

  rowMargin: number

  formMaxWidth: number
}

export interface ThemeProp {
  theme: Theme
}

export const defaultTheme: Theme = {
  appBannerFontSize: 80,
  appBannerMargin: 20,

  welcomeFontSize: 16,
  welcomeMargin: 20,

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

  formMaxWidth: 500,
}
