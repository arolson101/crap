import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Picker } from 'react-native'
import { ctx } from '../../ctx'
import { glamorous, ThemeProp } from '../../Theme'
import { FormField, FormFieldProps, FieldProps } from './FieldProps'
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

  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor
    items: Item[]
    onValueChange?: (value: string | number) => any
  }
}

const SelectFieldComponent: React.SFC<SelectField.Props & FormFieldProps> =
  ({ fieldApi, label, items, onValueChange }, { intl }: ctx.Intl) => {
    const error = fieldApi.getTouched() && fieldApi.getError()
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
          selectedValue={fieldApi.getValue()}
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
  }
SelectFieldComponent.contextTypes = ctx.intl

export const SelectField = FormField<SelectField.Props>(SelectFieldComponent)
SelectField.displayName = 'SelectField'
