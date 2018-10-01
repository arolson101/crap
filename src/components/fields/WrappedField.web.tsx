import glamorous from 'glamorous'
import * as React from 'react'
import { FieldAPI } from 'react-form'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { ThemeProp } from '../../App/index'

const Row = glamorous.div<ThemeProp>({}, ({ theme }) => ({
  marginBottom: theme.rowMargin,
  flexDirection: 'row',
  alignItems: 'baseline'
}))
Row.displayName = 'Row'

const LabelColumn = glamorous.span<ThemeProp>({}, ({ theme }) => ({
  width: theme.labelWidth,
  fontSize: theme.labelFontSize,
  color: theme.labelColor
}))
LabelColumn.displayName = 'LabelColumn'

const InputColumn = glamorous.div({
  flexDirection: 'column',
  flex: 1
})
InputColumn.displayName = 'InputColumn'

const ErrorMessage = glamorous.span<ThemeProp>({}, ({ theme }) => ({
  color: theme.errorTextColor
}))
ErrorMessage.displayName = 'ErrorMessage'

export namespace WrappedField {
  export interface Props {
    label?: FormattedMessage.MessageDescriptor
    onLabelPress?: () => any
    fieldApi: FieldAPI<any>
  }
}

const WrappedFieldComponent: React.ComponentType<WrappedField.Props & InjectedIntlProps> =
  ({ fieldApi, label, onLabelPress, children, intl }) => {
    const error = fieldApi.touched && fieldApi.error
    return (
      <Row>
        {label &&
          <LabelColumn onClick={onLabelPress}>
            {intl.formatMessage(label)}
          </LabelColumn>
        }
        <InputColumn>
          {children}
          {error &&
            <ErrorMessage>
              {fieldApi.error}
            </ErrorMessage>
          }
        </InputColumn>
      </Row>
    )
  }

export const WrappedField = injectIntl<WrappedField.Props>(WrappedFieldComponent)
