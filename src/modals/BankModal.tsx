import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Scrollable } from '../components/layout.native'
import { BankForm } from '../forms/BankForm'
import { makeScreen } from '../screens/Screen'

type Params = BankForm.Props

const BankModalComponent: React.SFC<BankForm.Props> = (props) => (
  <Scrollable>
    <BankForm {...props} />
  </Scrollable>
)

export const BankModal = compose(
  makeScreen<Params>({
    title: (props) => props.bankId ? messages.edit : messages.create,
    saveButton: true,
    cancelButton: true,
  }),
)(BankModalComponent)
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
