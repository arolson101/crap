import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, Container, Row, Text } from '../components/layout'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { AddButtonProps, makeScreen } from './Screen'

interface Props {
}

interface ConnectedProps {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
  modalBankCreate: () => any
  modalAccountCreate: (bankId: string) => any
  modalBankEdit: (bankId: string) => any
  navAccount: (accountId: string) => any
}

class AccountsScreenComponent extends React.Component<Props & ConnectedProps & AddButtonProps> {
  componentDidMount () {
    this.props.setAdd(this.props.modalBankCreate)
  }

  componentDidUpdate () {
    this.props.setAdd(this.props.modalBankCreate)
  }

  render () {
    return (
      <>
        <Text>Accounts page</Text>
        {this.props.query.banks.map(bank =>
          <Container key={bank.id}>
            <Text>{bank.name}</Text>
            <Row>
              <Button
                title='edit'
                onPress={() => this.props.modalBankEdit(bank.id)}
              />
              <Button
                title='add account'
                onPress={() => this.props.modalAccountCreate(bank.id)}
              />
            </Row>
            {bank.accounts.map(account =>
              <Row key={account.id}>
                <Button
                  title={account.name}
                  onPress={() => this.props.navAccount(account.id)}
                />
              </Row>
            )}
          </Container>
        )}
        <Button onPress={this.props.modalBankCreate} title='add bank' />
      </>
    )
  }
}

export const AccountsScreen = compose(
  makeScreen({ title: () => messages.title, addButton: true }),
  withQuery({ query: Queries.banks }),
  withMutation({ deleteBank: Mutations.deleteBank }),
  withMutation({ deleteAccount: Mutations.deleteAccount }),
  connect(null, {
    modalBankCreate: actions.modalBankCreate,
    modalAccountCreate: actions.modalAccountCreate,
    modalBankEdit: actions.modalBankEdit,
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
