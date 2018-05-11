import pick from 'lodash-es/pick'
import * as React from 'react'
import { View } from 'react-native'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Redirect } from 'react-router'
import { compose } from 'recompose'
import { nav } from '../nav'
import { filist, formatAddress } from '../fi'
import { Mutations, Queries, Types, Bank } from '../db'
import { ctx } from '../App'
import { ErrorMessage } from '../components/ErrorMessage'
import { typedFields } from '../components/fields'

interface Props {
  bankId?: string
}

interface ComposedProps extends Props {
  query: Queries.Bank
  saveBank: Mutations.SaveBank
}

type BankInput = {
  [P in keyof Types.BankInput]-?: Types.Bank[P]
}

interface FormValues extends BankInput {
  fi: number
}

const {
  Form,
  CheckboxField,
  CollapseField,
  SelectField,
  SubmitButton,
  TextField,
  UrlField
} = typedFields<FormValues>()

export const BankFormComponent: React.SFC<ComposedProps> = (props, { intl, router }: ctx.Intl & ctx.Router) => {
  if (props.query.loading) {
    return null
  }

  if (props.bankId && props.query.error) {
    return <ErrorMessage error={props.query.error} />
  }

  if (props.saveBank.error) {
    return <ErrorMessage error={props.saveBank.error} />
  }

  if (props.saveBank.called && props.saveBank.data) {
    return <Redirect to={nav.accounts()} />
  }

  const edit = props.bankId && props.query.data.bank
  const defaultFi = edit ? filist.findIndex(fi => fi.name === edit.name) : 0
  return (
    <Form
      defaultValues={{
        fi: defaultFi,
        ...(edit ? pick(edit, Object.keys(Bank.defaultValues)) as any : Bank.defaultValues)
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
        void props.saveBank.execute({ variables })
      }}
    >
      {formApi =>
        <React.Fragment>
          <View>
            <FormattedMessage {...messages.fiHelp} />
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
          </View>
          <View>
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
          </View>
          <View>
            <CheckboxField
              field='online'
              label={messages.online}
            />
          </View>
          <CollapseField field='online'>
            <View>
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
            </View>
            <View>
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
            </View>
          </CollapseField>
          <SubmitButton
            disabled={props.saveBank.loading}
            onPress={formApi.submitForm}
            title={edit ? messages.save : messages.create}
          />
        </React.Fragment>
      }
    </Form>
  )
}
BankFormComponent.contextTypes = { ...ctx.intl, ...ctx.router }

export const BankForm = compose<ComposedProps, Props>(
  Queries.withBank('query', ({ bankId }: Props) => bankId && ({ bankId })),
  Mutations.withSaveBank('saveBank')
)(BankFormComponent)
BankForm.displayName = 'BankForm'

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
