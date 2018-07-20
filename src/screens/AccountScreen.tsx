import cuid from 'cuid'
import { Body, List, ListItem } from 'native-base'
import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, Text } from '../components/layout'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { makeScreen } from './Screen'
import subDays from 'date-fns/sub_days'
import { pickT } from '../util/pick'
import { Scrollable } from '../components/layout.native'

interface Params {
  accountId: string
  accountName: string
}

interface Props extends Params {
  query: Queries.Account
  navAccountEdit: actions['navAccountEdit']
  navTransactionCreate: actions['navTransactionCreate']
  downloadTransactions: Mutations.DownloadTransactions
  cancel: Mutations.Cancel
}

class AccountScreenComponent extends React.PureComponent<Props> {
  render() {
    const { account } = this.props.query

    return (
      <>
        <Text>Account: {account.name}</Text>
        <Scrollable>
          <List>
            {account.transactions.map(tx =>
              <ListItem key={tx.id}>
                <Body>
                  <Text>{tx.name}</Text>
                  <Text note>{tx.memo}</Text>
                  <Text note>{tx.amount}</Text>
                  <Text note>{tx.serverid}</Text>
                  <Text note>{tx.time}</Text>
                </Body>
              </ListItem>
            )}
          </List>
        </Scrollable>
        <Button title='edit' onPress={() => this.props.navAccountEdit(account.id)} />
        <Button title='download' onPress={this.downloadTransactions} />
        <Button title='add transaction' onPress={() => this.props.navTransactionCreate(account.id)} />
      </>
    )
  }

  downloadTransactions = () => {
    const { accountId, cancel, downloadTransactions } = this.props
    const bankId = this.props.query.account.bankId
    const cancelToken = cuid()
    const end = new Date()
    const start = subDays(end, 30)
    downloadTransactions(
      { accountId, bankId, start, end, cancelToken },
      {
        cancel: () =>
          cancel({ cancelToken })
      })
  }
}

export const AccountScreen = compose(
  makeScreen({ title: (params: Params) => params.accountName }),
  withQuery({ query: Queries.Account }, (props: Props) => ({ accountId: props.accountId })),
  withMutation({ downloadTransactions: Mutations.DownloadTransactions }),
  withMutation({ cancel: Mutations.Cancel }),
  connect(null, pickT(actions, 'navAccountEdit', 'navTransactionCreate')),
)(AccountScreenComponent)
AccountScreen.displayName = 'AccountScreen'
