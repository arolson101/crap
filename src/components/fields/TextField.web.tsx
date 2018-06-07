import glamorous from 'glamorous'
import { FormGroup, Intent, TextArea } from '@blueprintjs/core'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ThemeProp, ctx } from '../../App'
import { WrappedField } from './WrappedField'

export namespace TextField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder?: FormattedMessage.MessageDescriptor
    secure?: boolean
    rows?: number
    textColor?: string
    autoFocus?: boolean
    onSubmitEditing?: () => any
    returnKeyType?: any
  }
}

export class TextField extends React.Component<TextField.Props> {
  static contextTypes = ctx.intl

  render () {
    const { field, autoFocus, label, textColor, placeholder, secure, rows, onSubmitEditing, returnKeyType } = this.props
    const { intl } = this.context as ctx.Intl
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
