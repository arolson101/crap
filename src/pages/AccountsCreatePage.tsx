import * as React from 'react'
import { defineMessages } from 'react-intl'
import { View, Picker } from 'react-native'
import { compose } from 'recompose'
import { Queries } from '../db'
import { nav } from '../nav'
import { BankForm } from '../forms/BankForm'
import { AccountForm } from '../forms/AccountForm'
import { ThemeProp, ctx } from '../App'
import { Row, LabelColumn, InputColumn } from '../components/layout'
import { ErrorMessage } from '../components/ErrorMessage'

interface Params {
  bankId?: string
}

interface Props {
  query: Queries.Banks
}

export const AccountsCreatePageComponent: React.SFC<Props> =
  (props, { intl, router }: ctx.Intl & ctx.Router<Params>) => {
    const { bankId } = router.route.match.params

    if (props.query.loading) {
      return null
    }

    if (props.query.error) {
      return <ErrorMessage error={props.query.error} />
    }

    return (
      <View>
        <Row>
          <LabelColumn>
            bank
          </LabelColumn>
          <InputColumn>
            <Picker
              onValueChange={(nextBankId) => router.history.replace(nextBankId
                ? nav.accountCreate(nextBankId)
                : nav.bankCreate()
              )}
              selectedValue={bankId}
            >
              <Picker.Item
                label={intl.formatMessage(messages.new)}
                value={''}
              />
              {props.query.data.banks.map(bank =>
                <Picker.Item
                  key={bank.id}
                  label={bank.name}
                  value={bank.id}
                />
              )}
            </Picker>
          </InputColumn>
        </Row>

        {bankId
          ? <AccountForm bankId={bankId} />
          : <BankForm />
        }
      </View>
    )
  }
AccountsCreatePageComponent.contextTypes = { ...ctx.intl, ...ctx.router }

export const AccountsCreatePage = compose(
  Queries.withBanks('query')
)(AccountsCreatePageComponent)

const messages = defineMessages({
  new: {
    id: 'AccountsCreatePage.new',
    defaultMessage: 'New...'
  }
})
