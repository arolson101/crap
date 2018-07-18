import * as React from 'react'
import { Field } from 'react-form'

export namespace CollapseField {
  export interface Props<T = {}> extends React.Props<{}> {
    field: string
  }
}

export class CollapseField extends React.Component<CollapseField.Props> {
  render () {
    const { field, children } = this.props
    return (
      <Field field={field}>
        {fieldApi =>
          fieldApi.value
            ? <React.Fragment>{children}</React.Fragment>
            : null
        }
      </Field>
    )
  }
}
