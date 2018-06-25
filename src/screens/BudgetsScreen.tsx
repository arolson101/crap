import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Container, Text } from '../components/layout'
import { withTitle } from '../util'

export const BudgetsScreenComponent: React.SFC = (props) => {
  return (
    <Container>
      <Text>Budgets page</Text>
    </Container>
  )
}

const messages = defineMessages({
  title: {
    id: 'BudgetsScreen.title',
    defaultMessage: 'Budgets'
  },
})

export const BudgetsScreen = compose(
  withTitle(messages.title),
)(BudgetsScreenComponent)
BudgetsScreen.displayName = 'BudgetsScreen'
