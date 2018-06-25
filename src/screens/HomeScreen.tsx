import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Queries } from '../db'
import { Container, Text } from '../components/layout'
import { ErrorMessage } from '../components/ErrorMessage'
import { withTitle } from '../util'

interface Props {
  query: Queries.Accounts
}

export const HomeScreenComponent: React.SFC<Props> = (props) => {
  if (props.query.loading) {
    return null
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  return (
    <Container>
      {!props.query.data.banks.length &&
        <Text>No banks</Text>
      }
      {props.query.data.banks.map(bank =>
        <Container key={bank.id}>
          <Text>{bank.name}</Text>
          {!bank.accounts.length &&
            <Text>No accounts</Text>
          }
          {bank.accounts.map(account =>
            <Container key={account.id}>
              <Text>{account.name}</Text>
            </Container>
          )}
        </Container>
      )}
      <Text>home page</Text>
    </Container>
  )
}

const messages = defineMessages({
  title: {
    id: 'LoginForm.title',
    defaultMessage: 'Home'
  },
  open: {
    id: 'LoginForm.open',
    defaultMessage: 'Open'
  },
})

export const HomeScreen = compose(
  withTitle(messages.title),
  Queries.withAccounts('query'),
)(HomeScreenComponent)
HomeScreen.displayName = 'HomePage'
