import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { BankForm } from '../forms/BankForm'
import { makeScreen } from '../screens/Screen'

interface Params {
  bankId?: string
}

const AddBankModalComponent: React.SFC = (props) => {
  return (
    <BankForm {...props} />
  )
}

export const AddBankModal = compose(
  makeScreen<Params>({
    title: (props) => props.bankId ? messages.edit : messages.create,
    saveButton: true,
    cancelButton: true,
  }),
)(AddBankModalComponent)
AddBankModal.displayName = 'AddBankModal'

const messages = defineMessages({
  create: {
    id: 'BankForm.create',
    defaultMessage: 'Add Bank'
  },
  edit: {
    id: 'BankForm.edit',
    defaultMessage: 'Edit Bank'
  },
})
