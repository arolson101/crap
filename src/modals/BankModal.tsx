import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { BankForm } from '../forms/BankForm'
import { makeScreen } from '../screens/Screen'

interface Params {
  bankId?: string
}

export const BankModal = compose(
  makeScreen<Params>({
    title: (props) => props.bankId ? messages.edit : messages.create,
    saveButton: true,
    cancelButton: true,
  }),
)(BankForm)
BankModal.displayName = 'BankModal'

const messages = defineMessages({
  create: {
    id: 'BankModal.create',
    defaultMessage: 'Add Bank'
  },
  edit: {
    id: 'BankModal.edit',
    defaultMessage: 'Edit Bank'
  },
})
