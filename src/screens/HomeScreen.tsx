import * as React from 'react'
import { defineMessages } from 'react-intl'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { ErrorMessage } from '../components/ErrorMessage'
import { Container, Text } from '../components/layout'
import { Queries } from '../db'
import { actions } from '../redux/actions'
import { Screen, fixScreen } from './Screen'

interface Props {
  query: Queries.Accounts
  modalAccountCreate: () => any
}

export const HomeScreenComponent: React.SFC<Props> = (props) => {
  if (props.query.loading) {
    return null
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  return (
    <Screen title={messages.title}>
      <Text>home page</Text>
      <Button title='modal' onPress={props.modalAccountCreate}/>
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
    </Screen>
  )
}

export const HomeScreen = compose(
  fixScreen,
  Queries.withAccounts('query'),
  connect(null, { modalAccountCreate: actions.modalAccountCreate })
)(HomeScreenComponent)
HomeScreen.displayName = 'HomePage'

const messages = defineMessages({
  title: {
    id: 'HomeScreen.title',
    defaultMessage: 'Home'
  },
})
