import { ActionSheet } from 'native-base'
import { Params } from './Confirmation'
import { defineMessages, intl } from '../intl'

export const confirm = (params: Params) => {
  const { title, action, onConfirm } = params
  const options: string[] = [
    intl.formatMessage(action),
    intl.formatMessage(messages.cancel)
  ]
  const destructiveButtonIndex = 0
  const cancelButtonIndex = 1
  ActionSheet.show(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      title: intl.formatMessage(title)
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
