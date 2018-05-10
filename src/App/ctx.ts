import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Form as ReactForm, FormContext } from 'react-form'
import { InjectedIntlProps } from 'react-intl'
import { RouterChildContext } from 'react-router'

export namespace ctx {
  export const router = {
    router: PropTypes.object
  }
  export const intl = {
    intl: PropTypes.object
  }
  export const form = ReactForm.childContextTypes

  export type Intl = InjectedIntlProps
  export type Router<T = any> = RouterChildContext<T>
  export type Form = FormContext
}

export const DbContext = React.createContext<{isOpen: boolean}>()
