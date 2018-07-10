import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { ctx } from '../App'
import { Button, Column, Text } from '../components/layout'
import { Queries } from '../db'
import { actions } from '../redux/actions/index'
import { withQuery } from '../db/queries/makeQuery'

interface Props {
  query: Queries.Accounts
  navHome: () => any
  navBudgets: () => any
  navAccounts: () => any
  navAccountView: (bankId: string, accountId: string) => any
}

export const SidebarComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history: { push } } } = context
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
              onPress={() => push(props.navAccountView(bank.id, account.id))}
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
SidebarComponent.contextTypes = ctx.router

export const Sidebar = compose(
  withQuery({ query: Queries.accounts }),
  connect(null, {
    navHome: actions.navHome,
    navAccounts: actions.navAccounts,
    navBudgets: actions.navBudgets,
    navAccountView: actions.navAccountView,
  })
)(SidebarComponent)
Sidebar.displayName = 'Sidebar'
