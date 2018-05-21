import glamorous from 'glamorous-native'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { Switch } from 'react-native'
import { ctx, ThemeProp } from '../../App'
import { WrappedField } from './WrappedField'

const StyledSwitch = glamorous(Switch)({},
  ({ theme }: ThemeProp) => ({
    marginLeft: 'auto'
  })
)
StyledSwitch.displayName = 'StyledSwitch'

export namespace CheckboxField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
  }
}

export const CheckboxField: React.SFC<CheckboxField.Props> =
  ({ field, label }, { intl }: ctx.Intl) => (
    <Field field={field}>
      {fieldApi =>
        <WrappedField label={label} fieldApi={fieldApi}>
          <StyledSwitch
            onValueChange={(value: boolean) => fieldApi.setValue(value)}
            value={fieldApi.value}
          />
        </WrappedField>
      }
    </Field>
  )
CheckboxField.contextTypes = ctx.intl
