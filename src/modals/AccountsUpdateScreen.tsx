import * as React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Container, Text } from '../components/layout'
import { BankForm } from '../forms/BankForm'
import { AccountForm } from '../forms/AccountForm'

interface Params {
  bankId: string
  accountId?: string
}

interface Props extends Params {}

export const AccountsUpdateScreen: React.SFC<Props> =
  ({ bankId, accountId }) => {
    return (
      <Container>
        <FormattedMessage {...messages.updateAccount}/>
        {accountId
          ? <AccountForm bankId={bankId} accountId={accountId} />
          : <BankForm bankId={bankId} />
        }
      </Container>
    )
  }

const messages = defineMessages({
  updateAccount: {
    id: 'AccountUpdatePage.save',
    defaultMessage: 'Update Account'
  },
})
