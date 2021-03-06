import { Button, View } from 'native-base'
import * as React from 'react'
import Collapsible from 'react-native-collapsible'
import { compose } from 'recompose'
import { confirm } from '../components/Confirmation'
import { typedFields } from '../components/fields/index'
import { Text } from '../components/index'
import { InjectedNavProps, withNav } from '../components/NavContext'
import { withMutation, withQuery } from '../db'
import { Bank, Mutations, Queries } from '../db/index'
import { SaveBank } from '../db/mutations/mutations-types'
import { filist, formatAddress } from '../fi'
import { SaveButtonProps } from '../screens/Screen'
import { pickT } from '../util/pick'
import { FormikProps, FormikErrors } from 'formik'
import { intl, defineMessages } from 'src/intl'

export namespace BankForm {
  export interface Props {
    bankId?: string
  }
}

type Props = BankForm.Props

interface ComposedProps extends Props, InjectedNavProps {
  query: Queries.Bank
  saveBank: Mutations.SaveBank
  deleteBank: Mutations.DeleteBank
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
  Divider,
  SelectField,
  TextField,
  UrlField
} = typedFields<FormValues>()

export class BankFormComponent extends React.Component<ComposedProps & SaveButtonProps> {
  private formApi: FormikProps<FormValues>

  componentDidMount() {
    const { setSave } = this.props
    setSave(this.onSave)
  }

  render() {
    const { bankId, query } = this.props

    const edit = bankId && query.bank
    const defaultFi = edit ? filist.findIndex(fi => fi.name === edit.name) : 0
    const initialValues = {
      fi: defaultFi,
      ...(edit
        ? pickT(edit, Object.keys(Bank.defaultValues) as Array<keyof Bank.Props>)
        : Bank.defaultValues
      )
    }

    return (
      <>
        <Form
          getApi={this.getApi}
          initialValues={initialValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {formApi =>
            <>
              <Divider>
                <Text note>{intl.formatMessage(messages.fiHelp)}</Text>
              </Divider>
              <SelectField
                field='fi'
                items={filist.map(fi => ({ label: fi.name, value: fi.id }))}
                label={messages.fi}
                onValueChange={this.fiOnValueChange}
                searchable
              />
              <Divider />
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
                favicoField='favicon'
                label={messages.web}
              />
              <TextField
                field='notes'
                label={messages.notes}
                rows={4}
              />
              <Divider />
              <CheckboxField
                field='online'
                label={messages.online}
              />
              <Collapsible collapsed={!formApi.values.online}>
                <TextField
                  field='username'
                  noCorrect
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
                  noCorrect
                  field='fid'
                  label={messages.fid}
                  placeholder={messages.fidPlaceholder}
                />
                <TextField
                  noCorrect
                  field='org'
                  label={messages.org}
                  placeholder={messages.orgPlaceholder}
                />
                <TextField
                  noCorrect
                  field='ofx'
                  label={messages.ofx}
                  placeholder={messages.ofxPlaceholder}
                />
              </Collapsible>
            </>
          }
        </Form>
        {edit &&
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button transparent danger onPress={this.confirmDeleteBank}>
              <Text>{intl.formatMessage(messages.deleteBank)}</Text>
            </Button>
          </View>
        }
      </>
    )
  }

  getApi = (formApi: FormikProps<FormValues>) => {
    this.formApi = formApi
  }

  onSave = () => {
    if (this.formApi) {
      this.formApi.submitForm()
    }
  }

  validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.name.trim()) {
      errors.name = intl.formatMessage(messages.valueEmpty)
    }
    return errors
  }

  onSubmit = ({ fi, ...input }: FormValues) => {
    const { saveBank, bankId } = this.props
    const variables = {
      bankId,
      input
    }
    saveBank(variables, { complete: this.onSaved })
  }

  onSaved = (result: SaveBank.Mutation) => {
    const { navBack, navBank, bankId } = this.props
    if (bankId) {
      navBack()
    } else {
      navBank(result.saveBank.id)
    }
  }

  fiOnValueChange = (value: number) => {
    const formApi = this.formApi
    if (formApi) {
      const fi = filist[value]
      formApi.setFieldValue('name', value ? (fi.name || '') : '')
      formApi.setFieldValue('web', fi.profile.siteURL || '')
      formApi.setFieldValue('favicon', '')
      formApi.setFieldValue('address', formatAddress(fi) || '')
      formApi.setFieldValue('fid', fi.fid || '')
      formApi.setFieldValue('org', fi.org || '')
      formApi.setFieldValue('ofx', fi.ofx || '')
    }
  }

  confirmDeleteBank = () => {
    confirm({
      title: messages.deleteBankTitle,
      action: messages.deleteBank,
      onConfirm: this.deleteBank,
    })
  }

  deleteBank = () => {
    const { deleteBank, bankId } = this.props
    if (bankId) {
      deleteBank({ bankId }, { complete: this.onBankDeleted })
    }
  }

  onBankDeleted = () => {
    const { navBack, navPopToTop } = this.props
    navBack()
    navPopToTop()
  }
}

export const BankForm = compose<ComposedProps, Props>(
  withNav,
  withQuery({ query: Queries.Bank }, ({ bankId }: Props) => bankId && ({ bankId })),
  withMutation({ saveBank: Mutations.SaveBank }),
  withMutation({ deleteBank: Mutations.DeleteBank })
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
  },
  deleteBank: {
    id: 'BankForm.deleteBank',
    defaultMessage: 'Delete Bank'
  },
  deleteBankTitle: {
    id: 'BankForm.deleteBankTitle',
    defaultMessage: 'Are you sure?'
  },
})
