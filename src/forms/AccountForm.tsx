import { Button, View } from 'native-base'
import * as React from 'react'
import { FormAPI } from 'react-form'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { SelectFieldItem, typedFields } from '../components/fields/index'
import { confirm } from '../components/index'
import { Container } from '../components/layout'
import { Account, Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { SaveButtonProps } from '../screens/Screen'
import { pickT } from '../util/pick'

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
  deleteAccount: Mutations.DeleteAccount
  navBack: actions['navBack']
  navPopToTop: actions['navPopToTop']
}

type FormValues = Account.Props

const { Form, SelectField, TextField } = typedFields<FormValues>()

export class AccountFormComponent extends React.PureComponent<ComposedProps> {
  formApi: FormAPI<FormValues>

  componentDidMount () {
    const { setSave } = this.props
    setSave(this.onSave)
  }

  render () {
    const props = this.props
    const edit = this.props.accountId && props.query.account
    const { intl } = this.props

    const defaultValues = {
      ...(edit
        ? pickT(edit, Object.keys(Account.defaultValues()) as Array<keyof Account.Props>)
        : Account.defaultValues()
      )
    }

    return (
      <>
        <Form
          getApi={this.getApi}
          defaultValues={defaultValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {formApi =>
            <Container>
              <TextField
                field='name'
                label={messages.name}
                placeholder={messages.namePlaceholder}
                autoFocus={!edit}
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
                onValueChange={this.typeOnValueChange}
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
        {edit &&
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button transparent danger onPress={this.confirmDeleteAccount}>
              <FormattedMessage {...messages.deleteAccount} />
            </Button>
          </View>
        }
      </>
    )
  }

  getApi = (formApi: FormAPI<FormValues>) => {
    this.formApi = formApi
  }

  onSave = () => {
    if (this.formApi) {
      this.formApi.submitForm()
    }
  }

  validate = (values: FormValues) => {
    const { intl: { formatMessage } } = this.props
    return {
      name: !values.name || !values.name.trim() ? formatMessage(messages.valueEmpty)
        : undefined
    }
  }

  onSubmit = (input: Account.Props) => {
    const { bankId, accountId, query, saveAccount } = this.props
    const edit = accountId && query.account

    const variables = {
      bankId,
      accountId: edit ? edit.id : null,
      input
    }

    saveAccount(variables, { complete: this.onSaveAccount })
  }

  onSaveAccount = () => {
    const { navBack } = this.props
    navBack()
  }

  typeOnValueChange = (type: Account.Type) => {
    if (this.formApi) {
      this.formApi.setValue('color', Account.generateColor(type))
    }
  }

  confirmDeleteAccount = () => {
    confirm({
      title: messages.deleteAccountTitle,
      action: messages.deleteAccount,
      formatMessage: this.props.intl.formatMessage,
      onConfirm: this.deleteAccount,
    })
  }

  deleteAccount = () => {
    this.onDeleted()
    const { deleteAccount, accountId } = this.props
    if (accountId) {
      deleteAccount({ accountId }, { complete: this.onDeleted })
    }
  }

  onDeleted = () => {
    const { navBack, navPopToTop } = this.props
    navBack()
    navPopToTop()
  }
}

export const AccountForm = compose<ComposedProps, Props>(
  injectIntl,
  withNavigation,
  connect(null, pickT(actions, 'navBack', 'navPopToTop')),
  withQuery({ query: Queries.account }, ({ accountId }: Props) => accountId && ({ accountId })),
  withMutation({ saveAccount: Mutations.saveAccount }),
  withMutation({ deleteAccount: Mutations.deleteAccount }),
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
  },
  deleteAccount: {
    id: 'AccountDialog.deleteAccount',
    defaultMessage: 'Delete Account'
  },
  deleteAccountTitle: {
    id: 'AccountForm.deleteAccountTitle',
    defaultMessage: 'Are you sure?'
  },
})
