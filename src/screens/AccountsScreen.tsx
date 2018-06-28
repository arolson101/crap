import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { compose } from 'recompose'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { Button, Container, Row, Text } from '../components/layout'
import { Mutations, Queries } from '../db'
import { AccountsCreateScreen, AccountsUpdateScreen } from '../modals'
import { nav, paths } from '../nav'
import { actions } from '../redux/actions/index'
import { AccountPage } from './AccountScreen'
import { makeScreen } from './Screen'

interface Props {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
  modalAccountCreate: () => any
}

export const AccountsScreenComponent: React.SFC<Props> = (props, { router }: ctx.Router) => {
  if (props.query.loading) {
    return null
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />
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
            {props.query.data.banks.map(bank =>
              <Container key={bank.id}>
                <Text>{bank.name}</Text>
                <Row>
                  <Button title='edit bank' onPress={() => router.history.push(nav.bankUpdate(bank.id))} />
                  <Button title='delete bank' onPress={() => props.deleteBank.execute({ variables: { bankId: bank.id } })} />
                  <Button title='add account' onPress={() => router.history.push(nav.accountCreate(bank.id))} />
                </Row>
                {bank.accounts.map(account =>
                  <Row key={account.id}>
                    <Button
                      title={account.name}
                      onPress={() => router.history.push(nav.accountView(bank.id, account.id))}
                    />
                    <Button
                      title='delete'
                      onPress={() => props.deleteAccount.execute({ variables: { accountId: account.id } })}
                    />
                  </Row>
                )}
              </Container>
            )}
            <Button onPress={props.modalAccountCreate} title='add bank' />
          </>
        </Route>
      </Switch>
    </>
  )
}
AccountsScreenComponent.contextTypes = ctx.router

const messages = defineMessages({
  title: {
    id: 'AccountsScreen.title',
    defaultMessage: 'Accounts'
  },
})

export const AccountsScreen = compose(
  makeScreen({ title: messages.title }),
  Queries.withBanks('query'),
  Mutations.withDeleteBank('deleteBank'),
  Mutations.withDeleteAccount('deleteAccount'),
  connect(null, {
    modalAccountCreate: actions.modalAccountCreate,
  })
)(AccountsScreenComponent)
AccountsScreen.displayName = 'AccountsPage'
