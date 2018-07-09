import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Form as ReactForm, FormContext } from 'react-form'
import { InjectedIntlProps } from 'react-intl'
import { RouterChildContext } from 'react-router'
import { AppStore } from '../redux/reducers/index';

export namespace ctx {
  export const router = {
    router: PropTypes.object
  }
  // export const intl = {
  //   intl: PropTypes.object
  // }
  export const store = {
    store: PropTypes.object
  }
  export const form = ReactForm.childContextTypes

  // export type Intl = InjectedIntlProps
  export type Router<T = any> = RouterChildContext<T>
  export type Store = { store: AppStore }
  export type Form = FormContext
}
