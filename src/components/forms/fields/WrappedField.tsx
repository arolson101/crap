import * as React from 'react'
import { BoundFormAPI } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ctx } from '../../ctx'
import { glamorous, ThemeProp } from '../../Theme'

const Row = glamorous.view<ThemeProp>({}, ({ theme }) => ({
  marginBottom: theme.rowMargin,
  flexDirection: 'row',
  alignItems: 'baseline'
}))
Row.displayName = 'Row'

const LabelColumn = glamorous.text<ThemeProp>({}, ({ theme }) => ({
  width: theme.labelWidth,
  fontSize: theme.labelFontSize,
  color: theme.labelColor
}))
LabelColumn.displayName = 'LabelColumn'

const InputColumn = glamorous.view({
  flexDirection: 'column',
  flex: 1
})
InputColumn.displayName = 'InputColumn'

const ErrorMessage = glamorous.text<ThemeProp>({}, ({ theme }) => ({
  color: theme.errorTextColor
}))
ErrorMessage.displayName = 'ErrorMessage'

export namespace WrappedField {
  export interface Props {
    label?: FormattedMessage.MessageDescriptor
    fieldApi: BoundFormAPI
  }
}

export const WrappedField: React.ComponentType<WrappedField.Props> =
  ({ fieldApi, label, children }, { intl }: ctx.Intl) => {
    const error = fieldApi.getTouched() && fieldApi.getError()
    return (
      <Row>
        {label &&
          <LabelColumn>
            {intl.formatMessage(label)}
          </LabelColumn>
        }
        <InputColumn>
          {children}
          {error &&
            <ErrorMessage>
              {fieldApi.getError()}
            </ErrorMessage>
          }
        </InputColumn>
      </Row>
    )
  }
WrappedField.contextTypes = ctx.intl
