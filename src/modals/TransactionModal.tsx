import * as React from 'react'
import { compose } from 'recompose'
import { Scrollable } from '../components/layout.native'
import { TransactionForm } from '../forms/TransactionForm'
import { makeScreen } from '../screens/Screen'
import { defineMessages } from 'src/intl'

type Params = TransactionForm.Props

const TransactionModalComponent: React.SFC<TransactionForm.Props> = (props) => (
  <Scrollable>
    <TransactionForm {...props} />
  </Scrollable>
)

export const TransactionModal = compose(
  makeScreen<Params>({
    title: (props) => props.transactionId ? messages.edit : messages.create,
    saveButton: true,
    cancelButton: true,
  }),
)(TransactionModalComponent)
TransactionModal.displayName = 'TransactionModal'

const messages = defineMessages({
  create: {
    id: 'TransactionModal.create',
    defaultMessage: 'Add Transaction'
  },
  edit: {
    id: 'TransactionModal.edit',
    defaultMessage: 'Edit Transaction'
  },
})
