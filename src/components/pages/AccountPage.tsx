import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'
import { Queries } from '../../db'
import { nav } from '../../nav'
import { ctx } from '../../App'
import { ErrorMessage } from '../ErrorMessage'

interface Params {
  bankId: string
  accountId: string
}

interface Props {
  query: Queries.Account
}

export const AccountPageComponent: React.SFC<Props> = (props, context: ctx.Router) => {
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
    <View>
      <Text>Account2: {account.name}</Text>
      <Text>bank: {account.name}</Text>
      <Button title='edit' onPress={() => history.push(nav.accountUpdate(bankId, accountId))} />
    </View>
  )
}
AccountPageComponent.contextTypes = ctx.router

export const AccountPage = compose(
  Queries.withAccount('query', (props: RouteComponentProps<Params>) => ({ accountId: props.match.params.accountId }))
)(AccountPageComponent)
AccountPage.displayName = 'AccountPage'
