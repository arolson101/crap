import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { compose } from 'recompose'
import { ErrorMessage } from '../components/ErrorMessage'
import { Button, Container, Row, Text } from '../components/layout'
import { Mutations, Queries } from '../db'
import { AccountsCreateScreen, AccountsUpdateScreen } from '../modals'
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
  modalAccountCreate: () => any
  navBank: (bankId: string) => any
  navAccount: (accountId: string) => any
}

class AccountsScreenComponent extends React.Component<Props & ConnectedProps & AddButtonProps> {
  componentDidMount () {
    this.props.setAdd(this.props.modalAccountCreate)
  }

  componentDidUpdate () {
    this.props.setAdd(this.props.modalAccountCreate)
  }

  render () {
    if (this.props.query.loading) {
      return null
    }

    if (this.props.query.error) {
      return <ErrorMessage error={this.props.query.error} />
    }

    return (
      <>
        <Switch>
          <Route path={paths.account.create} component={AccountsCreateScreen} />
          <Route path={paths.account.update} component={AccountsUpdateScreen} />
          <Route path={paths.account.view} component={AccountPage} />
          <Route>
            <>
              <Text>Accounts page</Text>
              {this.props.query.data.banks.map(bank =>
                <Container key={bank.id}>
                  <Text>{bank.name}</Text>
                  <Row>
                    <Button title='bank' onPress={() => this.props.navBank(bank.id)} />
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
              <Button onPress={this.props.modalAccountCreate} title='add bank' />
            </>
          </Route>
        </Switch>
      </>
    )
  }
}

const messages = defineMessages({
  title: {
    id: 'AccountsScreen.title',
    defaultMessage: 'Accounts'
  },
})

export const AccountsScreen = compose(
  makeScreen({ title: messages.title, addButton: true }),
  Queries.withBanks('query'),
  Mutations.withDeleteBank('deleteBank'),
  Mutations.withDeleteAccount('deleteAccount'),
  connect(null, {
    modalAccountCreate: actions.modalAccountCreate,
  })
)(AccountsScreenComponent)
AccountsScreen.displayName = 'AccountsPage'