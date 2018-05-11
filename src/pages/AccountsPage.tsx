import * as React from 'react'
import { Text, Button, View } from 'react-native'
import { Switch, Route } from 'react-router'
import { compose } from 'recompose'
import { nav, paths } from '../nav'
import { Queries, Mutations } from '../db'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { AccountsCreatePage } from './AccountsCreatePage'
import { AccountsUpdatePage } from './AccountsUpdatePage'
import { AccountPage } from './AccountPage'

interface Props {
  query: Queries.Banks
  deleteBank: Mutations.DeleteBank
  deleteAccount: Mutations.DeleteAccount
}

export const AccountsPageComponent: React.SFC<Props> = (props, { router }: ctx.Router) => {
  if (props.query.loading) {
    return null
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  return (
    <Switch>
      <Route path={paths.account.create} component={AccountsCreatePage} />
      <Route path={paths.account.update} component={AccountsUpdatePage} />
      <Route path={paths.account.view} component={AccountPage} />
      <Route>
        <>
          <Text>Accounts page</Text>
          {props.query.data.banks.map(bank =>
            <View key={bank.id}>
              <Text>{bank.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Button title='edit bank' onPress={() => router.history.push(nav.bankUpdate(bank.id))} />
                <Button title='delete bank' onPress={() => props.deleteBank.execute({ variables: { bankId: bank.id } })} />
                <Button title='add account' onPress={() => router.history.push(nav.accountCreate(bank.id))} />
              </View>
              {bank.accounts.map(account =>
                <View key={account.id} style={{ flexDirection: 'row' }}>
                  <Button
                    title={account.name}
                    onPress={() => router.history.push(nav.accountView(bank.id, account.id))}
                  />
                  <Button
                    title='delete'
                    onPress={() => props.deleteAccount.execute({ variables: { accountId: account.id } })}
                  />
                </View>
              )}
            </View>
          )}
          <Button onPress={() => router.history.push(nav.bankCreate())} title='add bank' />
        </>
      </Route>
    </Switch>
  )
}
AccountsPageComponent.contextTypes = ctx.router

export const AccountsPage = compose(
  Queries.withBanks('query'),
  Mutations.withDeleteBank('deleteBank'),
  Mutations.withDeleteAccount('deleteAccount'),
)(AccountsPageComponent)
AccountsPage.displayName = 'AccountsPage'
