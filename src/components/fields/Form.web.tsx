import * as React from 'react'
import * as RF from 'react-form'

type Props = RF.FormProps

export const Form: React.SFC<Props> = (props) => {
  return (
    <RF.Form {...props}/>
  )
}
