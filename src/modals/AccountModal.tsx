import { defineMessages } from 'react-intl'
import { compose } from 'redux'
import { AccountForm } from '../forms/AccountForm'
import { makeScreen } from '../screens/Screen'

interface Params {
  bankId: string
  accountId?: string
}

export const AccountModal = compose(
  makeScreen<Params>({
    title: (props) => props.accountId ? messages.edit : messages.create,
    saveButton: true,
    cancelButton: true,
  }),
)(AccountForm)
AccountModal.displayName = 'AccountModal'

const messages = defineMessages({
  create: {
    id: 'AccountModal.create',
    defaultMessage: 'Add Account'
  },
  edit: {
    id: 'AccountModal.edit',
    defaultMessage: 'Edit Account'
  },
})
