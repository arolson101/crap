import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { ErrorMessage } from '../components/ErrorMessage'
import { Container, Text } from '../components/layout'
import { Queries } from '../db'
import { makeScreen, ScreenComponent } from './Screen'

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
    <>
      <Text>home page</Text>
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
    </>
  )
}

const messages = defineMessages({
  title: {
    id: 'HomeScreen.title',
    defaultMessage: 'Home'
  },
})

export const HomeScreen = compose(
  makeScreen({ title: messages.title }),
  Queries.withAccounts('query'),
  connect(null, { }),
)(HomeScreenComponent) as ScreenComponent
HomeScreen.displayName = 'HomePage'
