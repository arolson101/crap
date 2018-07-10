import * as PropTypes from 'prop-types'
import { RouterChildContext } from 'react-router'

export namespace ctx {
  export const router = {
    router: PropTypes.object
  }
  // export const intl = {
  //   intl: PropTypes.object
  // }
  // export const store = {
  //   store: PropTypes.object
  // }
  // export const form = ReactForm.childContextTypes

  // export type Intl = InjectedIntlProps
  export type Router<T = any> = RouterChildContext<T>
  // export type Store = { store: AppStore }
  // export type Form = FormContext
}
