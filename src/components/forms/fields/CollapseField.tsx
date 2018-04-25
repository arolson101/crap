import * as React from 'react'
import { FormField, FormFieldProps, FieldProps } from './FieldProps'

export namespace CollapseField {
  export interface Props<T = {}> extends FieldProps<T>, React.Props<{}> {
  }
}

export const CollapseField: React.ComponentType<CollapseField.Props> = FormField(
  ({ fieldApi, children }: CollapseField.Props & FormFieldProps) => {
    if (fieldApi.getValue()) {
      return <React.Fragment>{children}</React.Fragment>
    } else {
      return null
    }
  }
)
