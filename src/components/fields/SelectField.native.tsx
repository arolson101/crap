import glamorous from 'glamorous-native'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { Picker } from 'react-native'
import { ThemeProp } from '../../App'
import { WrappedField } from './WrappedField'

const StyledPicker = glamorous(Picker)({},
  ({ error, theme }: ThemeProp & { error: any }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor
  })
)
StyledPicker.displayName = 'StyledPicker'

export namespace SelectField {
  export interface Item {
    label: string
    value: string | number
  }

  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    items: Item[]
    onValueChange?: (value: string | number) => any
  }
}

export const SelectField: React.SFC<SelectField.Props> =
  ({ field, label, items, onValueChange }) => (
    <Field field={field}>
      {fieldApi => {
        const error = fieldApi.touched && fieldApi.error
        return (
          <WrappedField label={label} fieldApi={fieldApi}>
            <StyledPicker
              error={error}
              onValueChange={(value) => {
                fieldApi.setValue(value)
                if (onValueChange) {
                  onValueChange(value)
                }
              }}
              selectedValue={fieldApi.value}
            >
              {items.map(item =>
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              )}
            </StyledPicker>
          </WrappedField>
        )
      }}
    </Field>
  )
