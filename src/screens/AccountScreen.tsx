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

class AccountScreenComponent extends React.PureComponent<Props> {
  render () {
    const { account } = this.props.query

    return (
      <>
        <Text>Account: {account.name}</Text>
        <Text>bank: {account.name}</Text>
        <Button title='edit' onPress={() => this.props.navAccountEdit(account.id)} />
      </>
    )
  }
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
