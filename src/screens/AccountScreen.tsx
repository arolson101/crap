import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'
import { Button, Text } from '../components/layout'
import { Queries } from '../db/index'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { makeScreen } from './Screen'

interface Params {
  accountId: string
}

interface Props extends Params {
  query: Queries.Account
  navAccountEdit: (accountId: string) => any
}

export const AccountScreenComponent: React.SFC<Props> = (props) => {
  const { account } = props.query

  return (
    <>
      <Text>Account2: {account.name}</Text>
      <Text>bank: {account.name}</Text>
      <Button title='edit' onPress={() => props.navAccountEdit(props.accountId)} />
    </>
  )
}

export const AccountPage = compose(
  makeScreen({ title: () => messages.title }),
  withQuery({ query: Queries.account }, (props: RouteComponentProps<Params>) => ({ accountId: props.match.params.accountId })),
  connect(null, { navAccountEdit: actions.navAccountEdit })
)(AccountScreenComponent)
AccountPage.displayName = 'AccountPage'

const messages = defineMessages({
  title: {
    id: 'AccountScreen.title',
    defaultMessage: 'Accounts'
  },
})
