import * as React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, Text } from '../components/layout'
import { Queries } from '../db/index'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { makeScreen } from './Screen'

interface Params {
  bankId: string
}

interface Props extends Params {
  query: Queries.Bank
  navBankEdit: (bankId: string) => any
}

export const BankScreenComponent: React.SFC<Props> = (props) => {
  const { bank } = props.query

  return (
    <>
      <Text>bank: {bank.name}</Text>
      <Button title='edit' onPress={() => props.navBankEdit(bank.id)} />
    </>
  )
}

export const BankScreen = compose(
  makeScreen({ title: () => messages.title }),
  withQuery({ query: Queries.bank }, ({ bankId }: Params) => ({ bankId })),
  connect(null, { navBankEdit: actions.navBankEdit })
)(BankScreenComponent)
BankScreen.displayName = 'BankScreen'

const messages = defineMessages({
  title: {
    id: 'BankScreen.title',
    defaultMessage: 'Bank'
  },
})
