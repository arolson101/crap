import * as web from './Screen.web'
import * as native from './Screen.native'
import { NavigationParams, NavigationScreenComponent } from 'react-navigation'

export type ScreenComponent<T = {}, P = any> = NavigationScreenComponent<NavigationParams, {}, P>
  & { title: TitleFcn<T> }

/// export to get the shape of the module
export * from './Screen.web'
