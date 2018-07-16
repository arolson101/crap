import { Body, Card, CardItem, Text } from 'native-base'
import * as React from 'react'
import { defineMessages } from 'react-intl'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Divider } from '../components/fields/Divider'
import { Button, List, ListItem } from '../components/layout.native'
import { Queries } from '../db/index'
import { withQuery } from '../db/queries/makeQuery'
import { Bank } from '../db/queries/queries-types'
import { actions } from '../redux/actions/index'
import { EditButtonProps, makeScreen } from './Screen'
import * as URL from 'url'
import platform from 'native-base/dist/src/theme/variables/platform';

interface Params {
  bankId: string
}

interface Props extends Params, EditButtonProps {
  query: Queries.Bank
  navBankEdit: (bankId: string) => any
  navAccount: (accountId: string, accountName: string) => any
  navAccountCreate: (bankId: string) => any
}

export class BankScreenComponent extends React.PureComponent<Props> {
  componentDidMount () {
    this.props.setEdit(this.bankEdit)
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
                <Text style={{color: platform.brandPrimary}} note>{bank.web}</Text>
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
        <Divider><Text>accounts</Text></Divider>
        <List>
          {bank.accounts.map(account => (
            <AccountItem key={account.id} {...this.props} account={account} />
          ))}
          <Button block title='add account' onPress={this.accountCreate} />
        </List>
      </>
    )
  }
}

class AccountItem extends React.Component<Props & { account: Bank.Accounts }> {
  render () {
    const { account } = this.props
    return (
      <ListItem key={account.id} onPress={this.onPress}>
        <Text>{account.name}</Text>
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
})
