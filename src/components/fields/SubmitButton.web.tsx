import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from '@blueprintjs/core'
import { ctx } from '../../App'

interface Props {
  title: FormattedMessage.MessageDescriptor
  onPress: Function
  disabled?: boolean
}

export const SubmitButton: React.ComponentType<Props> =
  ({ title, disabled, onPress }: Props) => (
    <Button
      disabled={disabled}
      onClick={() => onPress()}
    >
      <FormattedMessage {...title}/>
    </Button>
  )
