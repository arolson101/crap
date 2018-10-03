import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, Column, Text } from '../components/layout'
import { Queries } from '../db/index'
import { actions } from '../redux/actions/index'
import { withQuery } from '../db'

interface Props {
  query: Queries.Accounts
  navHome: () => any
  navBudgets: () => any
  navAccounts: () => any
  navAccount: (accountId: string, accountName: string) => any
}

export const SidebarComponent: React.SFC<Props> = (props) => {
  return (
    <Column>
      <Button onPress={props.navHome} title='home' />
      <Button onPress={props.navBudgets} title='budgets' />
      <Button onPress={props.navAccounts} title='accounts' />
      {props.query.banks.map(bank =>
        <React.Fragment key={bank.id}>
          <Text>{bank.name}</Text>
          {bank.accounts.map(account =>
            <Button
              key={account.id}
              onPress={() => props.navAccount(account.id, account.name)}
              title={account.name}
              // subtitle={'$100.00'}
              // subtitleNumberOfLines={3}
              // hideChevron
            />
          )}
        </React.Fragment>
      )}
    </Column>
  )
}

export const Sidebar = compose(
  withQuery({ query: Queries.Accounts }),
  connect(null, {
    navHome: actions.navHome,
    navAccounts: actions.navAccounts,
    navBudgets: actions.navBudgets,
    navAccount: actions.navAccount,
  })
)(SidebarComponent)
Sidebar.displayName = 'Sidebar'
