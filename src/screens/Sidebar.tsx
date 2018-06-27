import * as React from 'react'
import { compose } from 'recompose'
import { Column, Button, Text } from '../components/layout'
import { nav } from '../nav'
import { Queries } from '../db'
import { ctx } from '../App'
import { connect } from 'react-redux';
import { actions } from '../redux/actions/index';

interface Props {
  query: Queries.Accounts
  navHome: () => any
  navBudgets: () => any
  navAccounts: () => any
  navAccountView: (bankId: string, accountId: string) => any
}

export const SidebarComponent: React.SFC<Props> = (props, context: ctx.Router) => {
  const { router: { history: { push } } } = context
  if (props.query.loading) {
    return null
  }
  return (
    <Column>
      <Button onPress={props.navHome} title='home' />
      <Button onPress={props.navBudgets} title='budgets' />
      <Button onPress={props.navAccounts} title='accounts' />
      {props.query.data.banks.map(bank =>
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
  Queries.withAccounts('query'),
  connect(null, {
    navHome: actions.navHome,
    navAccounts: actions.navAccounts,
    navBudgets: actions.navBudgets,
    navAccountView: actions.navAccountView,
  })
)(SidebarComponent)
Sidebar.displayName = 'Sidebar'
