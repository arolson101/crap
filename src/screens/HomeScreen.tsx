import * as React from 'react'
import { defineMessages } from 'react-intl'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Queries } from '../db'
import { Container, Text } from '../components/layout'
import { ErrorMessage } from '../components/ErrorMessage'
import { withTitle } from '../util'
import { navActions } from '../redux/actions'

interface Props {
  query: Queries.Accounts
  navAccounts: () => any
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
      <Text>home page</Text>
      <Button title='accounts' onPress={props.navAccounts}/>
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
    </Container>
  )
}

const messages = defineMessages({
  title: {
    id: 'HomeScreen.title',
    defaultMessage: 'Home'
  },
})

export const HomeScreen = compose(
  withTitle(messages.title),
  Queries.withAccounts('query'),
  connect(null, { navAccounts: navActions.accounts })
)(HomeScreenComponent)
HomeScreen.displayName = 'HomePage'
