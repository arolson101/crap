import { ActionSheet } from 'native-base'
import { defineMessages } from 'react-intl'
import { Params } from './Confirmation'

export const confirm = (params: Params) => {
  const { title, action, onConfirm, formatMessage } = params
  const options: string[] = [
    formatMessage(action),
    formatMessage(messages.cancel)
  ]
  const destructiveButtonIndex = 0
  const cancelButtonIndex = 1
  ActionSheet.show(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      title: formatMessage(title)
    },
    buttonIndex => {
      if (buttonIndex === destructiveButtonIndex) {
        onConfirm()
      }
    }
  )
}

const messages = defineMessages({
  cancel: {
    id: 'Confirmation.cancel',
    defaultMessage: 'Cancel'
  }
})
