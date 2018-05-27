import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { Switch } from '@blueprintjs/core'
import { ctx, ThemeProp } from '../../App'
import { WrappedField } from './WrappedField'

export namespace CheckboxField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
  }
}

export const CheckboxField: React.SFC<CheckboxField.Props> =
  ({ field, label }, { intl }: ctx.Intl) => (
    <Field field={field}>
      {fieldApi => (
          <WrappedField fieldApi={fieldApi}>
            <Switch
              className='pt-align-right'
              label={intl.formatMessage(label)}
              checked={fieldApi.value}
              onChange={e => fieldApi.setValue(e.currentTarget.checked)}
            />
          </WrappedField>
        )
      }
    </Field>
  )
CheckboxField.contextTypes = ctx.intl
