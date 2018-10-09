import * as React from 'react'
import * as RF from 'react-form'
import { FormProps } from './Form'

export namespace Form {
  export type Props<Values> = FormProps<Values>
}

type Props = RF.FormProps

export const Form: React.SFC<Props> = (props) => {
  return (
    <RF.Form {...props}/>
  )
}
