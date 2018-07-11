import { Body, Icon, Right, View, Left, Switch } from 'native-base'
import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { List, ListItem, Text } from '../components/layout.native'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { Banks } from '../db/queries/queries-types'
import { actions } from '../redux/actions/index'
import { AddButtonProps, makeScreen } from './Screen'

interface Props {
}

interface ConnectedProps {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
  navBankCreate: () => any
  navAccountCreate: (bankId: string) => any
  navBank: (bankId: string) => any
  navAccount: (accountId: string, accountName: string) => any
}

class AccountsScreenComponent extends React.Component<Props & ConnectedProps & AddButtonProps> {
  componentDidMount () {
    const { setAdd } = this.props
    setAdd(this.onAddButton)
  }

  render () {
    const { banks } = this.props.query
    return (
      <View style={{ flex: 1 }}>
        {banks.length === 0 &&
          <Text>No accounts</Text>
        }
        {banks.map(bank =>
          <React.Fragment key={bank.id}>
            <View style={{ height: 20 }} />
            <BankItem {...this.props} bank={bank} />
          </React.Fragment>
        )}
      </View>
    )
  }

  onAddButton = () => {
    const { navBankCreate } = this.props
    navBankCreate()
  }
}

class BankItem extends React.Component<ConnectedProps & { bank: Banks.Banks }> {
  render () {
    const { bank } = this.props
    return (
      <List>
        <ListItem onPress={this.onPress}>
          <Body>
            <Text>
              {bank.name}
            </Text>
          </Body>
          <Right>
            <Icon name='arrow-forward' />
          </Right>
        </ListItem>
        {bank.accounts.map(account =>
          <AccountItem key={account.id} {...this.props} account={account} />
        )}
      </List>
    )
  }

  onPress = () => {
    const { navBank, bank } = this.props
    navBank(bank.id)
  }
}

class AccountItem extends React.Component<ConnectedProps & { account: Banks.Accounts }> {
  render () {
    const { account } = this.props
    return (
      <ListItem /*avatar*/ key={account.id} onPress={this.onPress}>
        {/* <Left>
          <Icon name='warning' style={{color: 'orange'}}/>
        </Left> */}
        <Body>
          <Text>
            {account.name}
          </Text>
          <Text note>balance: $1234</Text>
        </Body>
        <Right>
          <Icon name='arrow-forward' />
        </Right>
      </ListItem>
    )
  }

  onPress = () => {
    const { account, navAccount } = this.props
    navAccount(account.id, account.name)
  }
}

export const AccountsScreen = compose(
  makeScreen({ title: () => messages.title, addButton: true }),
  withQuery({ query: Queries.banks }),
  withMutation({ deleteBank: Mutations.deleteBank }),
  withMutation({ deleteAccount: Mutations.deleteAccount }),
  connect(null, {
    navBankCreate: actions.navBankCreate,
    navAccountCreate: actions.navAccountCreate,
    navBank: actions.navBank,
    navAccount: actions.navAccount,
  })
)(AccountsScreenComponent)
AccountsScreen.displayName = 'AccountsPage'

const messages = defineMessages({
  title: {
    id: 'AccountsScreen.title',
    defaultMessage: 'Accounts'
  },
})
