import * as React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Container, Text } from '../components/layout'
import { BankForm } from '../forms/BankForm'
import { AccountForm } from '../forms/AccountForm'
import { ctx } from '../App'

interface Params {
  bankId: string
  accountId?: string
}

export const AccountsUpdatePage: React.SFC =
  (props, { router }: ctx.Router<Params>) => {
    const { route } = router
    const { bankId, accountId } = route.match.params
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
AccountsUpdatePage.contextTypes = { ...ctx.router }

const messages = defineMessages({
  updateAccount: {
    id: 'AccountUpdatePage.save',
    defaultMessage: 'Update Account'
  },
})
