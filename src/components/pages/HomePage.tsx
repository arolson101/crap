import * as React from 'react'
import { View, Text } from 'react-native'
import { compose } from 'recompose'
import { Queries } from '../../db'
import { ErrorMessage } from '../ErrorMessage'

interface Props {
  query: Queries.Accounts
}

export const HomePageComponent: React.SFC<Props> = (props) => {
  if (props.query.loading) {
    return null
  }

  if (props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  return (
    <View>
      {!props.query.data.banks.length &&
        <Text>No banks</Text>
      }
      {props.query.data.banks.map(bank =>
        <View key={bank.id}>
          <Text>{bank.name}</Text>
          {!bank.accounts.length &&
            <Text>No accounts</Text>
          }
          {bank.accounts.map(account =>
            <View key={account.id}>
              <Text>{account.name}</Text>
            </View>
          )}
        </View>
      )}
      <Text>home page</Text>
    </View>
  )
}

export const HomePage = compose(
  Queries.withAccounts('query')
)(HomePageComponent)
HomePage.displayName = 'HomePage'
