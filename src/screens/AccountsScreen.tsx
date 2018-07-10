import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { compose } from 'recompose'
import { Button, Container, Row, Text } from '../components/layout'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { AccountsUpdateScreen } from '../modals/index'
import { paths } from '../nav'
import { actions } from '../redux/actions/index'
import { AccountPage } from './AccountScreen'
import { AddButtonProps, makeScreen } from './Screen'

interface Props {
}

interface ConnectedProps {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
  modalBankCreate: () => any
  modalAccountCreate: () => any
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
        <Switch>
          {/* <Route path={paths.account.edit} component={AccountsUpdateScreen} /> */}
          <Route path={paths.account.view} component={AccountPage} />
          <Route>
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
          </Route>
        </Switch>
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
