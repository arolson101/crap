import glamorous from 'glamorous'
import * as React from 'react'
import { Field } from 'react-form'
import { FormattedMessage } from 'react-intl'
import { ThemeProp, ctx } from '../../App'
import { WrappedField } from './WrappedField'

const StyledTextInput = glamorous.input<ThemeProp & { error: any }>({},
  ({ theme, error }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: theme.controlFontColor
  })
)
StyledTextInput.displayName = 'StyledTextInput'

export namespace UrlField {
  export interface Props<T = {}> {
    field: string
    label: FormattedMessage.MessageDescriptor
    placeholder?: FormattedMessage.MessageDescriptor
    autoFocus?: boolean
    onSubmitEditing?: () => any
    returnKeyType?: any
  }
}

export class UrlField extends React.Component<UrlField.Props> {
  static contextTypes = ctx.intl

  private textInput = React.createRef<any>()

  focusTextInput = () => {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  render () {
    const { field, autoFocus, label, placeholder, onSubmitEditing, returnKeyType } = this.props
    const { intl } = this.context as ctx.Intl
    return (
      <Field field={field}>
        {fieldApi => {
          const error = fieldApi.touched && fieldApi.error
          return (
            <WrappedField label={label} fieldApi={fieldApi} onLabelPress={this.focusTextInput}>
              <StyledTextInput
                autoFocus={autoFocus}
                error={error}
                onChange={fieldApi.setValue}
                value={fieldApi.value}
                placeholder={placeholder && intl.formatMessage(placeholder)}
                innerRef={(current) => this.textInput = { current }}
              />
            </WrappedField>
          )
        }}
      </Field>
    )
  }
}
