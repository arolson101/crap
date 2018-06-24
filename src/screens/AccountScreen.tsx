import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'
import { Container, Button, Text } from '../components/layout'
import { Queries } from '../db'
import { nav } from '../nav'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'

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
    <Container>
      <Text>Account2: {account.name}</Text>
      <Text>bank: {account.name}</Text>
      <Button title='edit' onPress={() => history.push(nav.accountUpdate(bankId, accountId))} />
    </Container>
  )
}
AccountScreenComponent.contextTypes = ctx.router

export const AccountPage = compose(
  Queries.withAccount('query', (props: RouteComponentProps<Params>) => ({ accountId: props.match.params.accountId }))
)(AccountScreenComponent)
AccountPage.displayName = 'AccountPage'
