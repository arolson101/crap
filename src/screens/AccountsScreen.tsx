import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { compose } from 'recompose'
import { Button, Container, Row, Text } from '../components/layout'
import { Mutations, Queries } from '../db'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { AccountsUpdateScreen } from '../modals'
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
    return (
      <>
        <Switch>
          <Route path={paths.account.update} component={AccountsUpdateScreen} />
          <Route path={paths.account.view} component={AccountPage} />
          <Route>
            <>
              <Text>Accounts page</Text>
              {this.props.query.banks.map(bank =>
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

export const AccountsScreen = compose(
  makeScreen({ title: () => messages.title, addButton: true }),
  withQuery({ query: Queries.banks }),
  withMutation({ deleteBank: Mutations.deleteBank }),
  withMutation({ deleteAccount: Mutations.deleteAccount }),
  connect(null, {
    modalAccountCreate: actions.modalAccountCreate,
    navBank: actions.navBank,
  })
)(AccountsScreenComponent)
AccountsScreen.displayName = 'AccountsPage'

const messages = defineMessages({
  title: {
    id: 'AccountsScreen.title',
    defaultMessage: 'Accounts'
  },
})
