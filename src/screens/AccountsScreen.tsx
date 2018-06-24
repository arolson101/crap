import * as React from 'react'
import { Switch, Route } from 'react-router'
import { compose } from 'recompose'
import { nav, paths } from '../nav'
import { Queries, Mutations } from '../db'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { Container, Row, Button, Text } from '../components/layout'
import { AccountsCreateScreen } from './AccountsCreateScreen'
import { AccountsUpdateScreen } from './AccountsUpdateScreen'
import { AccountPage } from './AccountScreen'

interface Props {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
}

export const AccountsScreenComponent: React.SFC<Props> = (props, { router }: ctx.Router) => {
  if (props.query.loading) {
    return null
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  return (
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
          <Button onPress={() => router.history.push(nav.bankCreate())} title='add bank' />
        </>
      </Route>
    </Switch>
  )
}
AccountsScreenComponent.contextTypes = ctx.router

export const AccountsScreen = compose(
  Queries.withBanks('query'),
  Mutations.withDeleteBank('deleteBank'),
  Mutations.withDeleteAccount('deleteAccount'),
)(AccountsScreenComponent)
AccountsScreen.displayName = 'AccountsPage'
