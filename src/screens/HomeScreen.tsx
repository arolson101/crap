import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Container, Text } from '../components/layout'
import { Queries } from '../db/index'
import { withQuery } from '../db'
import { makeScreen, ScreenComponent } from './Screen'

interface Props {
  query: Queries.Accounts
}

export const HomeScreenComponent: React.SFC<Props> = (props) => {
  return (
    <>
      <Text>home page</Text>
      {!props.query.banks.length &&
        <Text>No banks</Text>
      }
      {props.query.banks.map(bank =>
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

export const HomeScreen = compose(
  makeScreen({ title: () => messages.title }),
  withQuery({ query: Queries.Accounts }),
)(HomeScreenComponent) as ScreenComponent
HomeScreen.displayName = 'HomePage'

const messages = defineMessages({
  title: {
    id: 'HomeScreen.title',
    defaultMessage: 'Home'
  },
})
