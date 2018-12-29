import * as React from 'react'
import { compose } from 'recompose'
import { Button, Column, Text } from '../components/layout'
import { InjectedNavProps } from '../components/NavContext'
import { withQuery } from '../db'
import { Queries } from '../db/index'

interface Props extends InjectedNavProps {
  query: Queries.Accounts
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
)(SidebarComponent)
Sidebar.displayName = 'Sidebar'
