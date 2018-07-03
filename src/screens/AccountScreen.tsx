import * as React from 'react'
import { defineMessages } from 'react-intl'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { Button, Text } from '../components/layout'
import { Queries } from '../db'
import { nav } from '../nav'
import { makeScreen } from './Screen'

interface Params {
  bankId: string
  accountId: string
}

interface Props {
  query: Queries.Account
}

export const AccountScreenComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history, route } } = context
  const { account } = props.query
  const { bankId, accountId } = route.match.params

  return (
    <>
      <Text>Account2: {account.name}</Text>
      <Text>bank: {account.name}</Text>
      <Button title='edit' onPress={() => history.push(nav.accountUpdate(bankId, accountId))} />
    </>
  )
}
AccountScreenComponent.contextTypes = ctx.router

const messages = defineMessages({
  title: {
    id: 'AccountScreen.title',
    defaultMessage: 'Accounts'
  },
})

export const AccountPage = compose(
  makeScreen({ title: messages.title }),
  Queries.withAccount('query', (props: RouteComponentProps<Params>) => ({ accountId: props.match.params.accountId }))
)(AccountScreenComponent)
AccountPage.displayName = 'AccountPage'
