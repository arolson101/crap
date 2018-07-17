import cuid from 'cuid'
import { Body, Card, CardItem, Icon, Right, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as URL from 'url'
import { Divider } from '../components/fields/Divider'
import { List, ListItem } from '../components/layout.native'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { Bank } from '../db/queries/queries-types'
import { actions } from '../redux/actions/index'
import { EditButtonProps, makeScreen } from './Screen'

interface Params {
  bankId: string
}

interface Props extends Params, EditButtonProps {
  query: Queries.Bank
  navBankEdit: (bankId: string) => any
  navAccount: (accountId: string, accountName: string) => any
  navAccountCreate: (bankId: string) => any
  getAccountList: Mutations.GetAccountList
  cancel: Mutations.Cancel
}

export class BankScreenComponent extends React.PureComponent<Props> {

  componentDidMount () {
    this.props.setEdit(this.bankEdit)
  }

  render () {
    const { bank } = this.props.query

    return (
      <>
        <Card>
          <CardItem header>
            <Text>{bank.name}</Text>
          </CardItem>
          {bank.web &&
            <CardItem button onPress={this.webOnPress}>
              <Body>
                <Text style={{ color: platform.brandPrimary }} note>{bank.web}</Text>
              </Body>
            </CardItem>
          }
          <CardItem>
            <Body>
              {bank.address.split(/\n/g).map((line, i) => (
                <Text key={i} note>{line}</Text>
              ))}
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              {bank.notes.split(/\n/g).map((line, i) => (
                <Text key={i} note>{line}</Text>
              ))}
            </Body>
          </CardItem>
        </Card>
        <Divider>
          {bank.accounts.length
            ? <FormattedMessage {...messages.accountList}>{txt => <Text note>{txt}</Text>}</FormattedMessage>
            : <FormattedMessage {...messages.accountListEmpty}>{txt => <Text note>{txt}</Text>}</FormattedMessage>
          }
        </Divider>
        <List>
          {bank.accounts.map(account => (
            <AccountItem key={account.id} {...this.props} account={account} />
          ))}
          <Divider />
          {bank.online &&
            <ListItem onPress={this.getAccountList}>
              <FormattedMessage {...messages.getAccountList} />
            </ListItem>
          }
          <ListItem onPress={this.accountCreate}>
            <FormattedMessage {...messages.addAccount} />
          </ListItem>
        </List>
      </>
    )
  }

  bankEdit = () => {
    this.props.navBankEdit(this.props.bankId)
  }

  accountCreate = () => {
    this.props.navAccountCreate(this.props.bankId)
  }

  webOnPress = () => {
    const { bank } = this.props.query
    const urlf = URL.parse(bank.web)
    if (!urlf.protocol) {
      urlf.protocol = 'https'
    }
    const url = URL.format(urlf)
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.warn('Can\'t handle url: ' + url)
        return
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.warn('An error occurred', err))
  }

  getAccountList = () => {
    const { bankId, getAccountList, cancel } = this.props
    const cancelToken = cuid()
    getAccountList(
      { bankId, cancelToken },
      { cancel: () => {
        cancel({ cancelToken })
      }}
    )
  }
}

class AccountItem extends React.Component<Props & { account: Bank.Accounts }> {
  render () {
    const { account } = this.props
    return (
      <ListItem onPress={this.onPress}>
        <Body>
          <Text>{account.name}</Text>
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

export const BankScreen = compose(
  makeScreen({ title: () => messages.title, editButton: true }),
  withQuery({ query: Queries.bank }, (params: Params) => params),
  withMutation({ getAccountList: Mutations.getAccountList }),
  withMutation({ cancel: Mutations.cancel }),
  connect(null, {
    navBankEdit: actions.navBankEdit,
    navAccount: actions.navAccount,
    navAccountCreate: actions.navAccountCreate,
  })
)(BankScreenComponent)
BankScreen.displayName = 'BankScreen'

const messages = defineMessages({
  title: {
    id: 'BankScreen.title',
    defaultMessage: 'Bank'
  },
  accountList: {
    id: 'BankScreen.accountList',
    defaultMessage: 'Accounts'
  },
  accountListEmpty: {
    id: 'BankScreen.accountListEmpty',
    defaultMessage: 'No Accounts'
  },
  getAccountList: {
    id: 'BankScreen.getAccountList',
    defaultMessage: 'Get account list from server...'
  },
  addAccount: {
    id: 'BankScreen.addAccount',
    defaultMessage: 'Add account...'
  }
})
