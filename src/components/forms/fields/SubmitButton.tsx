import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'react-native'
import { ctx } from '../../ctx'

interface Props {
  title: FormattedMessage.MessageDescriptor
  onPress: Function
  disabled?: boolean
}

export const SubmitButton: React.ComponentType<Props> =
  ({ title, disabled, onPress }: Props, { intl }: ctx.Intl) => (
    <Button
      disabled={disabled}
      title={intl.formatMessage(title)}
      onPress={() => onPress()}
    />
  )
SubmitButton.contextTypes = ctx.intl
