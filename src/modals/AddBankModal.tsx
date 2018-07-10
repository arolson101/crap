import { pick } from 'lodash'
import * as React from 'react'
import { FormAPI } from 'react-form'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { typedFields } from '../components/fields'
import { Bank, Mutations, Queries } from '../db'
import { filist, formatAddress } from '../fi'
import { actions } from '../redux/actions/index'
import { makeScreen, SaveButtonProps } from '../screens/Screen'
import { Button } from '../components/layout'
import { BankForm } from '../forms/BankForm';

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
