import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, Text, List, ListItem } from '../components/layout.native'
import { Queries } from '../db/index'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { makeScreen, EditButtonProps } from './Screen'
import { H1 } from 'native-base';

interface Params {
  bankId: string
}

interface Props extends Params, EditButtonProps {
  query: Queries.Bank
  navBankEdit: (bankId: string) => any
  navAccount: (accountId: string) => any
  navAccountCreate: (bankId: string) => any
}

export class BankScreenComponent extends React.PureComponent<Props> {
  componentDidMount () {
    this.props.setEdit(this.bankEdit)
  }

  componentDidUpdate () {
    this.props.setEdit(this.bankEdit)
  }

  bankEdit = () => {
    this.props.navBankEdit(this.props.bankId)
  }

  accountCreate = () => {
    this.props.navAccountCreate(this.props.bankId)
  }

  render () {
    const { bank } = this.props.query

    return (
      <>
        <List>
          <ListItem><H1>{bank.name}</H1></ListItem>
          {bank.accounts.map(account => (
            <ListItem key={account.id} onPress={() => this.props.navAccount(account.id)}>
              <Text>{account.name}</Text>
            </ListItem>
          ))}
        </List>
        <Button block title='add account' onPress={this.accountCreate} />
      </>
    )
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
