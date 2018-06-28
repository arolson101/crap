import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Text } from '../components/layout'
import { makeScreen } from './Screen'

export const BudgetsScreenComponent: React.SFC = (props) => {
  return (
    <>
      <Text>Budgets page</Text>
    </>
  )
}

const messages = defineMessages({
  title: {
    id: 'BudgetsScreen.title',
    defaultMessage: 'Budgets'
  },
})

export const BudgetsScreen = compose(
  makeScreen({ title: messages.title }),
)(BudgetsScreenComponent)
BudgetsScreen.displayName = 'BudgetsScreen'
