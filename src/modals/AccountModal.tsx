import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Scrollable } from '../components/layout.native'
import { AccountForm } from '../forms/AccountForm'
import { makeScreen } from '../screens/Screen'

type Params = AccountForm.Props

const AccountModalComponent: React.SFC<AccountForm.Props> = (props) => (
  <Scrollable>
    <AccountForm {...props} />
  </Scrollable>
)

export const AccountModal = compose(
  makeScreen<Params>({
    title: (props) => props.accountId ? messages.edit : messages.create,
    saveButton: true,
    cancelButton: true,
  }),
)(AccountModalComponent)
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
