import glamorous from 'glamorous-native'
import { FormGroup, Intent } from '@blueprintjs/core'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'
import { ThemeProp, ctx } from '../../App'
import { WrappedField } from './WrappedField'

const StyledTextInput = glamorous.textInput<ThemeProp & { error: any, textColor?: string }>({},
  ({ theme, error, textColor }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: textColor ? textColor : theme.controlFontColor
  })
)
StyledTextInput.displayName = 'StyledTextInput'

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
    returnKeyType?: ReturnKeyType
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
              <input
                id={id}
                className={'pt-input pt-fill' + (error ? ' pt-intent-danger' : '')}
                type={secure ? 'password' : 'text'}
                placeholder={placeholder && intl.formatMessage(placeholder)}
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
