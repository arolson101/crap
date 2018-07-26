import { Button, View } from 'native-base'
import * as React from 'react'
import { FormAPI } from 'react-form'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { confirm } from '../components/Confirmation'
import { typedFields } from '../components/fields/index'
import { Text } from '../components/index'
import { Mutations, Queries, Transaction } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { actions } from '../redux/actions/index'
import { SaveButtonProps } from '../screens/Screen'
import { pickT } from '../util/pick'

export namespace TransactionForm {
  export interface Props {
    accountId: string
    transactionId?: string
  }
}

type Props = TransactionForm.Props

interface ComposedProps extends Props {
  query: Queries.Transaction
  saveTransaction: Mutations.SaveTransaction
  deleteTransaction: Mutations.DeleteTransaction
  navBack: actions['navBack']
  // navTransaction: actions['navTransaction']
  navPopToTop: actions['navPopToTop']
}

type TransactionInput = {
  [P in keyof Transaction.Props]-?: Transaction.Props[P]
}

interface FormValues extends TransactionInput {
}

const {
  Form,
  CheckboxField,
  Divider,
  DateField,
  TextField,
  UrlField
} = typedFields<FormValues>()

export class TransactionFormComponent extends React.Component<ComposedProps & InjectedIntlProps & SaveButtonProps> {
  formApi: FormAPI<FormValues>

  componentDidMount() {
    const { setSave } = this.props
    setSave(this.onSave)
  }

  render() {
    const { transactionId, query } = this.props

    const edit = transactionId && query.transaction
    const defaultValues = edit
      ? pickT(edit, Object.keys(Transaction.defaultValues()) as Array<keyof Transaction.Props>)
      : Transaction.defaultValues()

    return (
      <>
        <Form
          getApi={this.getApi}
          defaultValues={defaultValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {formApi =>
            <>
              <DateField
                field='time'
                label={messages.date}
              />
              <TextField
                field='name'
                autoFocus
                label={messages.name}
              />
              <TextField
                field='amount'
                label={messages.amount}
              />
              {/* TODO: account picker */}
              <TextField
                field='account'
                label={messages.account}
              />
              {/* <TextField
                field='serverid'
                label={messages.serverid}
              /> */}
              {/* <TextField
                field='type'
                label={messages.type}
              /> */}
              <TextField
                field='memo'
                label={messages.memo}
              />
            </>
          }
        </Form>
        {edit &&
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button transparent danger onPress={this.confirmDeleteTransaction}>
              <FormattedMessage {...messages.deleteTransaction} />
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
      name: !values.name.trim() ? formatMessage(messages.valueEmpty)
        : undefined
    }
  }

  onSubmit = (input: FormValues) => {
    const { saveTransaction, transactionId: id, accountId } = this.props
    const variables = {
      accountId,
      id,
      input
    }
    saveTransaction(variables, { complete: this.onSaved })
  }

  onSaved = () => {
    const { navBack } = this.props
    navBack()
  }

  confirmDeleteTransaction = () => {
    confirm({
      title: messages.deleteTransactionTitle,
      action: messages.deleteTransaction,
      formatMessage: this.props.intl.formatMessage,
      onConfirm: this.deleteTransaction,
    })
  }

  deleteTransaction = () => {
    const { deleteTransaction, transactionId } = this.props
    if (transactionId) {
      deleteTransaction({ transactionId }, { complete: this.onTransactionDeleted })
    }
  }

  onTransactionDeleted = () => {
    const { navBack, navPopToTop } = this.props
    navBack()
    navPopToTop()
  }
}

export const TransactionForm = compose<ComposedProps, Props>(
  injectIntl,
  connect(null, pickT(actions, 'navBack', /*'navTransaction',*/ 'navPopToTop')),
  withQuery({ query: Queries.Transaction }, ({ transactionId }: Props) => transactionId && ({ transactionId })),
  withMutation({ saveTransaction: Mutations.SaveTransaction }),
  withMutation({ deleteTransaction: Mutations.DeleteTransaction })
)(TransactionFormComponent)
TransactionForm.displayName = 'TransactionForm'

const messages = defineMessages({
  save: {
    id: 'TransactionForm.save',
    defaultMessage: 'Save'
  },
  create: {
    id: 'TransactionForm.create',
    defaultMessage: 'Add'
  },
  valueEmpty: {
    id: 'TransactionForm.valueEmpty',
    defaultMessage: 'Cannot be empty'
  },
  fi: {
    id: 'TransactionForm.fi',
    defaultMessage: 'Institution'
  },
  fiHelp: {
    id: 'TransactionForm.fiHelp',
    defaultMessage: 'Choose a financial institution from the list or fill in the details below'
  },
  fiPlaceholder: {
    id: 'TransactionForm.fiPlaceholder',
    defaultMessage: 'Select financial institution...'
  },
  account: {
    id: 'TransactionForm.account',
    defaultMessage: 'account'
  },
  accountPlaceholder: {
    id: 'TransactionForm.namePlaceholder',
    defaultMessage: 'Transaction Name'
  },
  serverid: {
    id: 'TransactionForm.serverid',
    defaultMessage: 'serverid'
  },
  type: {
    id: 'TransactionForm.type',
    defaultMessage: 'type'
  },
  name: {
    id: 'TransactionForm.name',
    defaultMessage: 'name'
  },
  date: {
    id: 'TransactionForm.date',
    defaultMessage: 'date'
  },
  memo: {
    id: 'TransactionForm.memo',
    defaultMessage: 'memo'
  },
  fid: {
    id: 'TransactionForm.fid',
    defaultMessage: 'Fid'
  },
  fidPlaceholder: {
    id: 'TransactionForm.fidPlaceholder',
    defaultMessage: '1234'
  },
  org: {
    id: 'TransactionForm.org',
    defaultMessage: 'Org'
  },
  orgPlaceholder: {
    id: 'TransactionForm.orgPlaceholder',
    defaultMessage: 'MYBANK'
  },
  ofx: {
    id: 'TransactionForm.ofx',
    defaultMessage: 'OFX Server'
  },
  ofxPlaceholder: {
    id: 'TransactionForm.ofxPlaceholder',
    defaultMessage: 'https://ofx.mybank.com'
  },
  username: {
    id: 'TransactionForm.username',
    defaultMessage: 'Username'
  },
  usernamePlaceholder: {
    id: 'TransactionForm.usernamePlaceholder',
    defaultMessage: 'Username'
  },
  password: {
    id: 'TransactionForm.password',
    defaultMessage: 'Password'
  },
  passwordPlaceholder: {
    id: 'TransactionForm.passwordPlaceholder',
    defaultMessage: 'Required'
  },
  deleteTransaction: {
    id: 'TransactionForm.deleteTransaction',
    defaultMessage: 'Delete Transaction'
  },
  deleteTransactionTitle: {
    id: 'TransactionForm.deleteTransactionTitle',
    defaultMessage: 'Are you sure?'
  },
  amount: {
    id: 'TransactionForm.amount',
    defaultMessage: 'amount'
  },
})
