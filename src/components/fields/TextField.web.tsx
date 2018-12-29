import { FormGroup, Intent, TextArea } from '@blueprintjs/core'
import { Field, FieldProps } from 'formik'
import * as React from 'react'
import { intl } from 'src/intl'
import { TextFieldProps } from './TextField'

export namespace TextField {
  export type Props<Values> = TextFieldProps<Values>
}

export class TextField<Values> extends React.Component<TextField.Props<Values>> {
  render() {
    const { field: name, label, placeholder, secure, rows } = this.props
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
              {rows && rows > 1 ?
                <TextArea
                  id={id}
                  className={'pt-input pt-fill' + (error ? ' pt-intent-danger' : '')}
                  placeholder={placeholder && intl.formatMessage(placeholder)}
                  onChange={field.onChange}
                  value={field.value}
                  rows={rows}
                />
                : <input
                  id={id}
                  className={'pt-input pt-fill' + (error ? ' pt-intent-danger' : '')}
                  type={secure ? 'password' : 'text'}
                  placeholder={placeholder && intl.formatMessage(placeholder)}
                  onChange={field.onChange}
                  value={field.value}
                />
              }
            </FormGroup>
          )
        }}
      </Field>
    )
  }
}
