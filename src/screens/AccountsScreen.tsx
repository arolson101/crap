import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, List, ListItem, Row, Text } from '../components/layout.native'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { AddButtonProps, makeScreen } from './Screen'
import { Right, Icon, Left } from 'native-base'

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
        {this.props.query.banks.length === 0 &&
          <Text>No accounts</Text>
        }
        <List>
          {this.props.query.banks.map(bank =>
            <React.Fragment key={bank.id}>
              <ListItem onPress={() => this.props.modalBankEdit(bank.id)}>
                <Left>
                  <Text>
                    {bank.name}
                  </Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
              {/* <Row>
                <Button
                  title='edit'
                  onPress={() => this.props.modalBankEdit(bank.id)}
                />
                <Button
                  title='add account'
                  onPress={() => this.props.modalAccountCreate(bank.id)}
                />
              </Row> */}
              {bank.accounts.map(account =>
                <ListItem key={account.id} onPress={() => this.props.navAccount(account.id)}>
                  <Text>
                    {account.name}
                  </Text>
                </ListItem>
              )}
            </React.Fragment>
          )}
        </List>
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
