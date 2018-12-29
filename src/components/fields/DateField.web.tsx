import { Field, FieldProps } from 'formik'
import { FormGroup, Intent, TextArea } from '@blueprintjs/core'
import { intl } from 'src/intl'
import * as React from 'react'
import { DateFieldProps } from './DateField'

export namespace DateField {
  export type Props<Values> = DateFieldProps<Values>
}

export class DateField<Values> extends React.Component<DateField.Props<Values>> {
  render() {
    const { field, label } = this.props
    const id = `${field}-input`
    return (
      <Field name={name}>
        {({ field, form }: FieldProps<Values>) => {
          const error = !!(form.touched[name] && form.errors[name])
          return (
            <FormGroup
              intent={error ? Intent.DANGER : undefined}
              helperText={error}
              label={intl.formatMessage(label)}
              labelFor={id}
            >
              <input
                id={id}
                className={'pt-input pt-fill' + (error ? ' pt-intent-danger' : '')}
                onChange={field.onChange}
                value={field.value.toString()}
              />
            </FormGroup>
          )
        }}
      </Field>
    )
  }
}
