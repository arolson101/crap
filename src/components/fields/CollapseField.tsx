import * as React from 'react'
import { Field } from 'react-form'

export namespace CollapseField {
  export interface Props<T = {}> extends React.Props<{}> {
    field: string
  }
}

export const CollapseField: React.SFC<CollapseField.Props> = ({ field, children }) => (
  <Field field={field}>
    {fieldApi =>
      fieldApi.value
        ? <React.Fragment>{children}</React.Fragment>
        : null
    }
  </Field>
)
