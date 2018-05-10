import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ReturnKeyType, TextInput } from 'react-native'
import { ThemeProp, ctx, glamorous } from '../../../App'
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

  private textInput = React.createRef<TextInput>()

  focusTextInput = () => {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  render () {
    const { field, autoFocus, label, textColor, placeholder, secure, rows, onSubmitEditing, returnKeyType } = this.props
    const { intl } = this.context as ctx.Intl
    return (
      <Field field={field}>
        {fieldApi => {
          const error = fieldApi.touched && fieldApi.error
          return (
            <WrappedField label={label} fieldApi={fieldApi} onLabelPress={this.focusTextInput}>
              <StyledTextInput
                error={error}
                autoFocus={autoFocus}
                multiline={(rows ? rows > 0 : undefined)}
                numberOfLines={rows}
                onChangeText={fieldApi.setValue}
                value={fieldApi.value}
                secureTextEntry={secure}
                placeholder={placeholder && intl.formatMessage(placeholder)}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                innerRef={(current) => this.textInput = { current }}
              />
            </WrappedField>
          )
        }}
      </Field>
    )
  }
}
