import { FormGroup, Intent } from '@blueprintjs/core'
import { Field, FieldProps } from 'formik'
import * as React from 'react'
import { intl } from 'src/intl'
import { UrlFieldProps } from './UrlField'

export namespace UrlField {
  export type Props<Values> = UrlFieldProps<Values>
}

export class UrlField<Values> extends React.Component<UrlField.Props<Values>> {
  private textInput = React.createRef<HTMLInputElement>()

  focusTextInput = () => {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  render() {
    const { field: name, autoFocus, label, placeholder } = this.props
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
                type='text'
                autoFocus={autoFocus}
                onChange={field.onChange}
                value={field.value}
                placeholder={placeholder && intl.formatMessage(placeholder)}
                ref={this.textInput}
              />
            </FormGroup>
          )
        }}
      </Field>
    )
  }
}
