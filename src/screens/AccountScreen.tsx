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
import { List, ListItem, Body } from 'native-base';

interface Params {
  accountId: string
  accountName: string
}

interface Props extends Params {
  query: Queries.Account
  navAccountEdit: actions['navAccountEdit']
}

class AccountScreenComponent extends React.PureComponent<Props> {
  render () {
    const { account } = this.props.query

    return (
      <>
        <Text>Account: {account.name}</Text>
        <List>
          {account.transactions.map(tx =>
            <ListItem key={tx.id}>
              <Body>
                <Text>{tx.name}</Text>
                <Text note>{tx.memo}</Text>
                <Text note>{tx.amount}</Text>
                <Text note>{tx.time}</Text>
              </Body>
            </ListItem>
          )}
        </List>
        <Button title='edit' onPress={() => this.props.navAccountEdit(account.id)} />
        <Button title='download' onPress={() => this.props.navAccountEdit(account.id)} />
      </>
    )
  }
}

export const AccountScreen = compose(
  makeScreen({ title: (params: Params) => params.accountName }),
  withQuery({ query: Queries.Account }, (props: Props) => ({ accountId: props.accountId })),
  connect(null, { navAccountEdit: actions.navAccountEdit })
)(AccountScreenComponent)
AccountScreen.displayName = 'AccountScreen'

const messages = defineMessages({
  title: {
    id: 'AccountScreen.title',
    defaultMessage: 'Account'
  },
})
