import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ctx } from '../../ctx'
import { glamorous, ThemeProp } from '../../Theme'
import { WrappedField } from './WrappedField'

const TextInput = glamorous.textInput<ThemeProp & { error: any }>({},
  ({ theme, error }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: theme.controlFontColor
  })
)
TextInput.displayName = 'TextInput'

export namespace MultilineTextField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder?: FormattedMessage.MessageDescriptor
    rows: number
    autoFocus?: boolean
  }
}

export const MultilineTextField: React.SFC<MultilineTextField.Props> =
  ({ field, autoFocus, label, placeholder, rows }, { intl }: ctx.Intl) => (
    <Field field={field}>
      {fieldApi => {
        const error = fieldApi.touched && fieldApi.error
        return (
          <WrappedField label={label} fieldApi={fieldApi}>
            <TextInput
              error={error}
              autoFocus={autoFocus}
              multiline={true}
              numberOfLines={rows}
              onChangeText={fieldApi.setValue}
              value={fieldApi.value}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            />
          </WrappedField>
        )
      }}
    </Field>
  )
MultilineTextField.contextTypes = ctx.intl
