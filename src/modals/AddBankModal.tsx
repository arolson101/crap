import { pick } from 'lodash'
import * as React from 'react'
import { FormAPI } from 'react-form'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { typedFields } from '../components/fields'
import { Bank, Mutations, Queries } from '../db'
import { filist, formatAddress } from '../fi'
import { actions } from '../redux/actions/index'
import { makeScreen, SaveButtonProps } from '../screens/Screen'

interface Props {
  bankId?: string
}

interface ComposedProps extends Props {
  query: Queries.Bank
  saveBank: Mutations.SaveBank
  navAccounts: () => any
}

type BankInput = {
  [P in keyof Bank.Props]-?: Bank.Props[P]
}

interface FormValues extends BankInput {
  fi: number
}

const {
  Form,
  CheckboxField,
  CollapseField,
  Divider,
  SelectField,
  SubmitButton,
  TextField,
  UrlField
} = typedFields<FormValues>()

export class BankFormComponent extends React.Component<ComposedProps & InjectedIntlProps & SaveButtonProps> {
  getApi = (formApi: FormAPI<FormValues>) => {
    this.props.setSave(formApi.submitForm)
  }

  render () {
    const { props } = this
    const { intl } = props

    const edit = props.bankId && props.query.bank
    const defaultFi = edit ? filist.findIndex(fi => fi.name === edit.name) : 0
    return (
      <Form
        getApi={this.getApi}
        defaultValues={{
          fi: defaultFi,
          ...(edit ? pick(edit, Object.keys(Bank.defaultValues)) : Bank.defaultValues)
        }}
        validate={values => ({
          name: !values.name.trim() ? intl.formatMessage(messages.valueEmpty)
            : undefined
        })}
        onSubmit={({ fi, ...input }) => {
          const variables = {
            bankId: props.bankId,
            input
          }
          props.saveBank(variables, props.navAccounts)
        }}
      >
        {formApi =>
          <>
            <Divider><FormattedMessage {...messages.fiHelp} /></Divider>
            <SelectField
              field='fi'
              items={filist.map(fi => ({ label: fi.name, value: fi.id }))}
              label={messages.fi}
              onValueChange={(value: number) => {
                const fi = filist[value]
                formApi.setValue('name', fi.name || '')
                formApi.setValue('web', fi.profile.siteURL || '')
                formApi.setValue('favicon', '')
                formApi.setValue('address', formatAddress(fi) || '')
                formApi.setValue('fid', fi.fid || '')
                formApi.setValue('org', fi.org || '')
                formApi.setValue('ofx', fi.ofx || '')
              }}
            />
            <Divider/>
            <TextField
              field='name'
              label={messages.name}
              placeholder={messages.namePlaceholder}
            />
            <TextField
              field='address'
              label={messages.address}
              rows={4}
            />
            <UrlField
              field='web'
              // favicoName='favicon'
              label={messages.web}
            />
            <TextField
              field='notes'
              label={messages.notes}
              rows={4}
            />
            <Divider/>
            <CheckboxField
              field='online'
              label={messages.online}
            />
            <CollapseField field='online'>
              <TextField
                field='username'
                label={messages.username}
                placeholder={messages.usernamePlaceholder}
              />
              <TextField
                secure
                field='password'
                label={messages.password}
                placeholder={messages.passwordPlaceholder}
              />
              <TextField
                field='fid'
                label={messages.fid}
                placeholder={messages.fidPlaceholder}
              />
              <TextField
                field='org'
                label={messages.org}
                placeholder={messages.orgPlaceholder}
              />
              <TextField
                field='ofx'
                label={messages.ofx}
                placeholder={messages.ofxPlaceholder}
              />
            </CollapseField>
            <SubmitButton
              // disabled={props.saveBank.loading}
              onPress={formApi.submitForm}
              title={edit ? messages.save : messages.create}
            />
          </>
        }
      </Form>
    )
  }
}

const messages = defineMessages({
  title: {
    id: 'BankForm.title',
    defaultMessage: 'Add Bank'
  },
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
  fi: {
    id: 'BankForm.fi',
    defaultMessage: 'Institution'
  },
  fiHelp: {
    id: 'BankForm.fiHelp',
    defaultMessage: 'Choose a financial institution from the list or fill in the details below'
  },
  fiPlaceholder: {
    id: 'BankForm.fiPlaceholder',
    defaultMessage: 'Select financial institution...'
  },
  name: {
    id: 'BankForm.name',
    defaultMessage: 'Name'
  },
  namePlaceholder: {
    id: 'BankForm.namePlaceholder',
    defaultMessage: 'Bank Name'
  },
  address: {
    id: 'BankForm.address',
    defaultMessage: 'Address'
  },
  web: {
    id: 'BankForm.web',
    defaultMessage: 'URL'
  },
  notes: {
    id: 'BankForm.notes',
    defaultMessage: 'Notes'
  },
  online: {
    id: 'BankForm.online',
    defaultMessage: 'Online'
  },
  fid: {
    id: 'BankForm.fid',
    defaultMessage: 'Fid'
  },
  fidPlaceholder: {
    id: 'BankForm.fidPlaceholder',
    defaultMessage: '1234'
  },
  org: {
    id: 'BankForm.org',
    defaultMessage: 'Org'
  },
  orgPlaceholder: {
    id: 'BankForm.orgPlaceholder',
    defaultMessage: 'MYBANK'
  },
  ofx: {
    id: 'BankForm.ofx',
    defaultMessage: 'OFX Server'
  },
  ofxPlaceholder: {
    id: 'BankForm.ofxPlaceholder',
    defaultMessage: 'https://ofx.mybank.com'
  },
  username: {
    id: 'BankForm.username',
    defaultMessage: 'Username'
  },
  usernamePlaceholder: {
    id: 'BankForm.usernamePlaceholder',
    defaultMessage: 'Username'
  },
  password: {
    id: 'BankForm.password',
    defaultMessage: 'Password'
  },
  passwordPlaceholder: {
    id: 'BankForm.passwordPlaceholder',
    defaultMessage: 'Required'
  }
})

export const BankForm = compose<ComposedProps, Props>(
  makeScreen({ title: messages.title, saveButton: true, cancelButton: true }),
  injectIntl,
  connect(null, { navAccounts: actions.navAccounts }),
  Queries.withBank('query', ({ bankId }: Props) => bankId && ({ bankId })),
  Mutations.withSaveBank('saveBank')
)(BankFormComponent)
BankForm.displayName = 'BankForm'
