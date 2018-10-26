import { Body, Button, Icon, Left, NativeBase, Right, Thumbnail } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { compose } from 'recompose'
import { Divider } from '../components/fields/Divider'
import { List, ListItem, Scrollable, Text } from '../components/layout.native'
import { InjectedNavProps, withNav } from '../components/NavContext'
import { withMutation, withQuery } from '../db'
import { Mutations, Queries } from '../db/index'
import { Banks } from '../db/queries/queries-types'
import { AddButtonProps, makeScreen } from './Screen'
import { defineMessages } from 'src/intl'

interface Props {
}

interface ConnectedProps extends InjectedNavProps {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
  closeDb: Mutations.CloseDb
}

class AccountsScreenComponent extends React.Component<Props & ConnectedProps & AddButtonProps> {
  componentDidMount() {
    const { setAdd } = this.props
    setAdd(this.onAddButton)
  }

  render() {
    const { banks } = this.props.query
    return (
      <Scrollable>
        <List>
          {banks.map(bank =>
            <React.Fragment key={bank.id}>
              <Divider />
              <BankItem {...this.props} bank={bank} />
            </React.Fragment>
          )}
          <Divider>
            {banks.length === 0 &&
              <Text>No Accounts</Text>
            }
          </Divider>
          <Button onPress={this.logout}><Text>logout</Text></Button>
        </List>
        {/* <List>
          <ListItem button onPress={this.onAddButton}>
            <Body>
              <Text>Add bank...</Text>
            </Body>
          </ListItem>
        </List> */}
      </Scrollable>
    )
  }

  logout = () => {
    const { closeDb, logout } = this.props
    console.log('closeDb')
    closeDb({}, { complete: this.onClosed })
  }

  onClosed = () => {
    const { closeDb, logout } = this.props
    logout()
  }

  onAddButton = () => {
    const { navBankCreate } = this.props
    navBankCreate()
  }
}

class BankItem extends React.Component<ConnectedProps & { bank: Banks.Banks }> {
  render() {
    const { bank } = this.props
    return (
      <>
        <List>
          <ListItem button onPress={this.onPress} style={{ paddingTop: platform.buttonPadding, paddingBottom: platform.buttonPadding, minHeight: 38 }}>
            {!!bank.favicon &&
              <Left style={{ flex: 0 }}>
                <Thumbnail small square {...JSON.parse(bank.favicon)} />
              </Left>
            }
            <Body>
              <Text note>
                {bank.name}
              </Text>
            </Body>
          </ListItem>
          {bank.accounts.map((account, i) =>
            <AccountItem key={account.id} {...this.props} account={account} first={i === 0} last={i === bank.accounts.length} />
          )}
        </List>
      </>
    )
  }

  onPress = () => {
    const { navBank, bank } = this.props
    navBank(bank.id)
  }
}

class AccountItem extends React.Component<ConnectedProps & { account: Banks.Accounts } & NativeBase.ListItem> {
  render() {
    const { account, ...props } = this.props
    return (
      <ListItem /*avatar*/ key={account.id} onPress={this.onPress} {...props}>
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
  withQuery({ query: Queries.Banks }),
  withMutation({ deleteBank: Mutations.DeleteBank }),
  withMutation({ deleteAccount: Mutations.DeleteAccount }),
  withMutation({ closeDb: Mutations.CloseDb }),
  withNav,
)(AccountsScreenComponent)
AccountsScreen.displayName = 'AccountsPage'

const messages = defineMessages({
  title: {
    id: 'AccountsScreen.title',
    defaultMessage: 'Accounts'
  },
})
