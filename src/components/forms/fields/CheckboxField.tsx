import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Switch } from 'react-native'
import { ctx } from '../../ctx'
import { glamorous, ThemeProp } from '../../Theme'
import { FormField, FormFieldProps, FieldProps } from './FieldProps'
import { WrappedField } from './WrappedField'

const StyledSwitch = glamorous(Switch)({},
  ({ theme }: ThemeProp) => ({
    marginLeft: 'auto'
  })
)
StyledSwitch.displayName = 'StyledSwitch'

export namespace CheckboxField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor
  }
}

const CheckboxFieldComponent: React.SFC<CheckboxField.Props & FormFieldProps> =
  ({ fieldApi, label }, { intl }: ctx.Intl) => (
    <WrappedField label={label} fieldApi={fieldApi}>
      <StyledSwitch
        onValueChange={(value: boolean) => fieldApi.setValue(value)}
        value={fieldApi.getValue()}
      />
    </WrappedField>
  )
CheckboxFieldComponent.contextTypes = ctx.intl

export const CheckboxField = FormField<CheckboxField.Props>(CheckboxFieldComponent)
CheckboxField.displayName = 'CheckboxField'
