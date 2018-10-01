import { FormGroup, Intent, TextArea } from '@blueprintjs/core'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { DateFieldProps } from './DateField'

export namespace DateField {
  export type Props<T = {}> = DateFieldProps<T>
}

export class DateFieldComponent extends React.Component<DateField.Props & InjectedIntlProps> {
  render() {
    const { field, intl, label } = this.props
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
              <input
                id={id}
                className={'pt-input pt-fill' + (error ? ' pt-intent-danger' : '')}
                onChange={(event) => fieldApi.setValue(event.target.value)}
                value={fieldApi.value}
              />
            </FormGroup>
          )
        }}
      </Field>
    )
  }
}

export const DateField = injectIntl<DateField.Props>(DateFieldComponent)
