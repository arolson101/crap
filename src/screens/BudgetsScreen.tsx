import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Text } from '../components/layout'
import { Screen, fixScreen } from './Screen'

export const BudgetsScreenComponent: React.SFC = (props) => {
  return (
    <Screen title={messages.title}>
      <Text>Budgets page</Text>
    </Screen>
  )
}

export const BudgetsScreen = compose(
  fixScreen,
)(BudgetsScreenComponent)
BudgetsScreen.displayName = 'BudgetsScreen'

const messages = defineMessages({
  title: {
    id: 'BudgetsScreen.title',
    defaultMessage: 'Budgets'
  },
})
