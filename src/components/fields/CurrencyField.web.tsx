import { FormGroup, Intent } from '@blueprintjs/core'
import { Field, FieldProps } from 'formik'
import * as React from 'react'
import { intl } from 'src/intl'
import { CurrencyFieldProps } from './CurrencyField'

export namespace CurrencyField {
  export type Props<Values> = CurrencyFieldProps<Values>
}

export class CurrencyField<Values> extends React.Component<CurrencyField.Props<Values>> {
  render() {
    const { field: name, label, placeholder } = this.props
    const id = `${name}-input`
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
                type={'text'}
                placeholder={placeholder && intl.formatMessage(placeholder)}
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
