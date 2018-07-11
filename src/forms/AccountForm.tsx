import { pick } from 'lodash'
import * as React from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { SelectFieldItem, typedFields } from '../components/fields/index'
import { Container } from '../components/layout'
import { Account, Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { SaveButtonProps } from '../screens/Screen';
import { FormAPI } from 'react-form';

export namespace AccountForm {
  export interface Props {
    accountId?: string
    bankId: string
  }
}

type Props = AccountForm.Props

interface ComposedProps extends Props, InjectedIntlProps, SaveButtonProps {
  query: Queries.Account
  saveAccount: Mutations.SaveAccount
  navAccount: (accountId: string, accountName: string) => any
}

type FormValues = Account.Props

const { Form, SelectField, TextField } = typedFields<FormValues>()

export class AccountFormComponent extends React.PureComponent<ComposedProps> {
  getApi = (formApi: FormAPI<FormValues>) => {
    this.props.setSave(formApi.submitForm)
  }

  render () {
    const props = this.props
    const edit = this.props.accountId && props.query.account
    const { intl } = this.props

    return (
      <Form
        getApi={this.getApi}
        defaultValues={{
          ...(edit ? pick(edit, Object.keys(Account.defaultValues())) as any : Account.defaultValues())
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
          props.saveAccount(variables, result => props.navAccount(result.saveAccount.id, result.saveAccount.name))
        }}
      >
        {formApi =>
          <Container>
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
              color={formApi.values.color}
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
          </Container>
        }
      </Form>
    )
  }
}
export const AccountForm = compose<ComposedProps, Props>(
  injectIntl,
  connect(null, { navAccount: actions.navAccount }),
  withMutation({ saveAccount: Mutations.saveAccount }),
  withQuery({ query: Queries.account }, ({ accountId }: Props) => accountId && ({ accountId })),
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
