import * as React from 'react'
import { compose } from 'recompose'
import { Text } from '../components/layout'
import { makeScreen } from './Screen'
import { defineMessages } from 'src/intl'

export const BudgetsScreenComponent: React.SFC = (props) => {
  return (
    <>
      <Text>Budgets page</Text>
    </>
  )
}

export const BudgetsScreen = compose(
  makeScreen({ title: () => messages.title }),
)(BudgetsScreenComponent)
BudgetsScreen.displayName = 'BudgetsScreen'

const messages = defineMessages({
  title: {
    id: 'BudgetsScreen.title',
    defaultMessage: 'Budgets'
  },
})
