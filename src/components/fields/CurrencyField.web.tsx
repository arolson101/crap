import { FormGroup, Intent, TextArea } from '@blueprintjs/core'
import * as React from 'react'
import { Field } from 'react-form'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { CurrencyFieldProps } from './CurrencyField'

export namespace CurrencyField {
  export type Props<T = {}> = CurrencyFieldProps
}

export class CurrencyFieldComponent extends React.Component<CurrencyField.Props & InjectedIntlProps> {
  render() {
    const { field, intl, label, placeholder, secure, rows } = this.props
    const id = `${field}-input`
    return (
      <Field field={field}>
        {fieldApi => {
          const error = fieldApi.touched && fieldApi.error
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
                  onChange={(event) => fieldApi.setValue(event.target.value)}
                  value={fieldApi.value}
                  rows={rows}
                />
                : <input
                  id={id}
                  className={'pt-input pt-fill' + (error ? ' pt-intent-danger' : '')}
                  type={secure ? 'password' : 'text'}
                  placeholder={placeholder && intl.formatMessage(placeholder)}
                  onChange={(event) => fieldApi.setValue(event.target.value)}
                  value={fieldApi.value}
                />
              }
            </FormGroup>
          )
        }}
      </Field>
    )
  }
}

export const CurrencyField = injectIntl<CurrencyField.Props>(CurrencyFieldComponent)