import * as React from 'react'
import { defineMessages } from 'react-intl'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { Button, Text } from '../components/layout'
import { Queries } from '../db'
import { nav } from '../nav'
import { fixScreen, Screen } from './Screen'

interface Params {
  bankId: string
  accountId: string
}

interface Props {
  query: Queries.Account
}

export const AccountScreenComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  if (props.query.loading) {
    return null
  }
  if (props.query.error) {
    return <ErrorMessage error={props.query.error}/>
  }
  const { router: { history, route } } = context
  const { account } = props.query.data
  const { bankId, accountId } = route.match.params

  return (
    <Screen title={messages.title}>
      <Text>Account2: {account.name}</Text>
      <Text>bank: {account.name}</Text>
      <Button title='edit' onPress={() => history.push(nav.accountUpdate(bankId, accountId))} />
    </Screen>
  )
}
AccountScreenComponent.contextTypes = ctx.router

export const AccountPage = compose(
  fixScreen,
  Queries.withAccount('query', (props: RouteComponentProps<Params>) => ({ accountId: props.match.params.accountId }))
)(AccountScreenComponent)
AccountPage.displayName = 'AccountPage'

const messages = defineMessages({
  title: {
    id: 'AccountScreen.title',
    defaultMessage: 'Accounts'
  },
})
