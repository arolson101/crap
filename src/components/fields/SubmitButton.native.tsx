import * as React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Button } from 'react-native'

interface Props {
  title: FormattedMessage.MessageDescriptor
  onPress: Function
  disabled?: boolean
}

export const SubmitButtonComponent: React.ComponentType<Props & InjectedIntlProps> =
  ({ title, disabled, onPress, intl }) => (
    <Button
      disabled={disabled}
      title={intl.formatMessage(title)}
      onPress={() => onPress()}
    />
  )

export const SubmitButton = injectIntl<Props>(SubmitButtonComponent)
