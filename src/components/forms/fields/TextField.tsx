import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ReturnKeyType } from 'react-native'
import { ctx } from '../../ctx'
import { glamorous, ThemeProp } from '../../Theme'
import { WrappedField } from './WrappedField'

const TextInput = glamorous.textInput<ThemeProp & { error: any, textColor?: string }>({},
  ({ theme, error, textColor }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: textColor ? textColor : theme.controlFontColor
  })
)
TextInput.displayName = 'TextInput'

export namespace TextField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder: FormattedMessage.MessageDescriptor
    secure?: boolean
    rows?: number
    textColor?: string
    autoFocus?: boolean
    onSubmitEditing?: () => any
    returnKeyType?: ReturnKeyType
  }
}

export const TextField: React.SFC<TextField.Props> =
  ({ field, autoFocus, label, textColor, placeholder, secure, rows, onSubmitEditing, returnKeyType }, { intl }: ctx.Intl) => (
    <Field field={field}>
      {fieldApi => {
        const error = fieldApi.touched && fieldApi.error
        return (
          <WrappedField label={label} fieldApi={fieldApi}>
            <TextInput
              error={error}
              autoFocus={autoFocus}
              multiline={(rows ? rows > 0 : undefined)}
              numberOfLines={rows}
              onChangeText={fieldApi.setValue}
              value={fieldApi.value}
              secureTextEntry={secure}
              placeholder={intl.formatMessage(placeholder)}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
            />
          </WrappedField>
        )
      }}
    </Field>
  )
TextField.contextTypes = ctx.intl
