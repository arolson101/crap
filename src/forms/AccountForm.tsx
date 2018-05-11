import pick from 'lodash-es/pick'
import * as React from 'react'
import { View } from 'react-native'
import { defineMessages } from 'react-intl'
import { Redirect } from 'react-router'
import { compose } from 'recompose'
import { nav } from '../nav'
import { Mutations, Queries, Types, Account } from '../db'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { typedFields, SelectFieldItem } from '../components/fields'

interface Props {
  accountId?: string
  bankId: string
}

interface ComposedProps extends Props {
  query: Queries.Account
  saveAccount: Mutations.SaveAccount
}

type FormValues = {
  // tslint:disable-next-line
  [P in keyof Types.AccountInput]-?: Types.Account[P]
}

const { Form, SelectField, SubmitButton, TextField } = typedFields<FormValues>()

export const AccountFormComponent: React.SFC<ComposedProps> = (props, { intl, router }: ctx.Intl & ctx.Router) => {
  if (props.saveAccount.called && props.saveAccount.data) {
    return <Redirect to={nav.accountView(props.bankId, props.saveAccount.data.saveAccount!.id)} />
  }

  if (props.accountId && props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  const edit = props.accountId && props.query.data.account

  return (
    <Form
      defaultValues={{
        ...(edit ? pick(edit, Object.keys(Account.defaultValues)) as any : Account.defaultValues)
      }}
      validate={values => ({
        name: !values.name || !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
          : undefined
      })}
      onSubmit={input => {
        const variables = {
          bankId: props.bankId,
          accountId: edit ? edit.id : null,
          input
        }
        void props.saveAccount.execute({ variables })
      }}
    >
      {formApi =>
        <>
          <View>
            <TextField
              field='name'
              label={messages.name}
              placeholder={messages.namePlaceholder}
              autoFocus
            />
            <TextField
              field='number'
              label={messages.number}
              placeholder={messages.numberPlaceholder}
            />
            <SelectField
              field='type'
              items={Object.keys(Account.Type).map((acct: Account.Type): SelectFieldItem => ({
                value: acct.toString(),
                label: intl.formatMessage(Account.messages[acct])
              }))}
              label={messages.type}
              onValueChange={(type: Account.Type) => {
                formApi.setValue('color', Account.generateColor(type))
              }}
            />
            <TextField
              field='color'
              label={messages.color}
              placeholder={messages.colorPlaceholder}
              textColor={formApi.values.color}
            />
            {(formApi.values.type === Account.Type.CHECKING || formApi.values.type === Account.Type.SAVINGS) &&
              <TextField
                field='routing'
                label={messages.routing}
                placeholder={messages.routingPlaceholder}
              />
            }
            {(formApi.values.type === Account.Type.CREDITCARD) &&
              <TextField
                field='key'
                label={messages.key}
                placeholder={messages.keyPlaceholder}
              />
            }
            <SubmitButton
              disabled={props.saveAccount.loading}
              onPress={formApi.submitForm}
              title={edit ? messages.save : messages.create}
            />
          </View>
        </>
      }
    </Form>
  )
}
AccountFormComponent.contextTypes = { ...ctx.intl, ...ctx.router }

export const AccountForm = compose<ComposedProps, Props>(
  Mutations.withSaveAccount('saveAccount'),
  Queries.withAccount('query', ({ accountId }: Props) => accountId && ({ accountId }))
)(AccountFormComponent)
AccountForm.displayName = 'AccountForm'

const messages = defineMessages({
  save: {
    id: 'BankForm.save',
    defaultMessage: 'Save'
  },
  create: {
    id: 'BankForm.create',
    defaultMessage: 'Add'
  },
  valueEmpty: {
    id: 'BankForm.valueEmpty',
    defaultMessage: 'Cannot be empty'
  },
  createTitle: {
    id: 'AccountDialog.createTitle',
    defaultMessage: 'Add Account'
  },
  editTitle: {
    id: 'AccountDialog.editTitle',
    defaultMessage: 'Edit Account'
  },
  name: {
    id: 'AccountDialog.name',
    defaultMessage: 'Name'
  },
  namePlaceholder: {
    id: 'AccountDialog.namePlaceholder',
    defaultMessage: 'My Checking'
  },
  number: {
    id: 'AccountDialog.number',
    defaultMessage: 'Number'
  },
  numberPlaceholder: {
    id: 'AccountDialog.numberPlaceholder',
    defaultMessage: '54321'
  },
  type: {
    id: 'AccountDialog.type',
    defaultMessage: 'Type'
  },
  uniqueName: {
    id: 'AccountDialog.uniqueName',
    defaultMessage: 'This account name is already used'
  },
  uniqueNumber: {
    id: 'AccountDialog.uniqueNumber',
    defaultMessage: 'This account number is already used'
  },
  color: {
    id: 'AccountDialog.color',
    defaultMessage: 'Color'
  },
  colorPlaceholder: {
    id: 'AccountDialog.colorPlaceholder',
    defaultMessage: 'red'
  },
  routing: {
    id: 'AccountDialog.routing',
    defaultMessage: 'Routing Number',
    description: `Bank identifier, A-9
      Use of this field by country:
      COUNTRY     Interpretation
      BEL         Bank code
      CAN         Routing and transit number
      CHE         Clearing number
      DEU         Bankleitzahl
      ESP         Entidad
      FRA         Banque
      GBR         Sort code
      ITA         ABI
      NLD         Not used (field contents ignored)
      USA         Routing and transit number`
  },
  routingPlaceholder: {
    id: 'AccountDialog.routingPlaceholder',
    defaultMessage: '0123456'
  },
  key: {
    id: 'AccountDialog.key',
    defaultMessage: 'Account Key'
  },
  keyPlaceholder: {
    id: 'AccountDialog.keyPlaceholder',
    defaultMessage: '(for international accounts)'
  }
})