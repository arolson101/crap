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
  downloadAccountList: Mutations.DownloadAccountList
  cancel: Mutations.Cancel
}

export class BankScreenComponent extends React.PureComponent<Props> {

  componentDidMount() {
    this.props.setEdit(this.bankEdit)
  }

  render() {
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
        <List>
          <Divider>
            {bank.accounts.length
              ? <FormattedMessage {...messages.accountList}>{txt => <Text note>{txt}</Text>}</FormattedMessage>
              : <FormattedMessage {...messages.accountListEmpty}>{txt => <Text note>{txt}</Text>}</FormattedMessage>
            }
          </Divider>
          {bank.accounts.map(account => (
            <AccountItem key={account.id} {...this.props} account={account} />
          ))}
          {bank.accounts.length > 0 &&
            <Divider />
          }
          {bank.online &&
            <ListItem button onPress={this.downloadAccountList}>
              <FormattedMessage {...messages.downloadAccountList} />
            </ListItem>
          }
          <ListItem button onPress={this.accountCreate}>
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

  downloadAccountList = () => {
    const { bankId, downloadAccountList, cancel } = this.props
    const cancelToken = cuid()
    downloadAccountList(
      { bankId, cancelToken },
      {
        cancel: () => {
          cancel({ cancelToken })
        }
      }
    )
  }
}

class AccountItem extends React.Component<Props & { account: Bank.Accounts }> {
  render() {
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
  withQuery({ query: Queries.Bank }, (params: Params) => params),
  withMutation({ downloadAccountList: Mutations.DownloadAccountList }),
  withMutation({ cancel: Mutations.Cancel }),
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
  downloadAccountList: {
    id: 'BankScreen.downloadAccountList',
    defaultMessage: 'Import accounts from server...'
  },
  addAccount: {
    id: 'BankScreen.addAccount',
    defaultMessage: 'Add account...'
  }
})
