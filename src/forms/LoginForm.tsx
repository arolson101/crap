import { Button, View } from 'native-base'
import * as React from 'react'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { compose } from 'recompose'
import { typedFields } from '../components/fields/index'
import { AppBannerText, confirm, FormContent, WelcomeText } from '../components/index'
import { InjectedNavProps, withNav } from '../components/NavContext'
import { withMutation, withQuery } from '../db'
import { Mutations, Queries } from '../db/index'
import { FormikErrors } from 'formik'

interface Props extends InjectedIntlProps, InjectedNavProps {
  query: Queries.Dbs
  createDb: Mutations.CreateDb
  openDb: Mutations.OpenDb
  deleteDb: Mutations.DeleteDb
}

interface FormValues {
  password: string
  passwordConfirm: string
}

const {
  Form,
  TextField,
} = typedFields<FormValues>()

export class LoginFormComponent extends React.Component<Props> {
  confirmInput: any

  render() {
    const create = this.props.query.allDbs.length === 0

    const initialValues = {
      password: '',
      passwordConfirm: ''
    }

    return (
      <>
        <AppBannerText>App</AppBannerText>

        <Form
          initialValues={initialValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {formApi =>
            <FormContent>
              <WelcomeText>
                <FormattedMessage {...(create ? messages.welcomeMessageCreate : messages.welcomeMessageOpen)} />
              </WelcomeText>
              <TextField
                autoFocus
                secure
                field='password'
                label={messages.passwordLabel}
                placeholder={messages.passwordPlaceholder}
                returnKeyType={create ? 'next' : 'go'}
                onSubmitEditing={create ? this.focusConfirmInput : formApi.submitForm}
              />
              {create &&
                <TextField
                  secure
                  field='passwordConfirm'
                  label={messages.passwordConfirmLabel}
                  placeholder={messages.passwordConfirmPlaceholder}
                  returnKeyType={'go'}
                  onSubmitEditing={formApi.submitForm}
                  inputRef={this.inputRef}
                />
              }
              <Button
                block
                onPress={formApi.submitForm}
              >
                <FormattedMessage {...(create ? messages.create : messages.open)} />
              </Button>
            </FormContent>
          }
        </Form>

        {!create &&
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button transparent danger onPress={this.confirmDelete}>
              <FormattedMessage {...messages.delete} />
            </Button>
          </View>
        }
      </>
    )
  }

  validate = (values: FormValues): FormikErrors<FormValues> => {
    const { intl: { formatMessage } } = this.props
    const create = this.props.query.allDbs.length === 0
    const errors: FormikErrors<FormValues> = {}

    if (create) {
      if (!values.password.trim()) {
        errors.password = formatMessage(messages.valueEmpty)
      }
      if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = formatMessage(messages.passwordsMatch)
      }
    } else {
      if (!values.password.trim()) {
        errors.password = formatMessage(messages.valueEmpty)
      }
    }

    return errors
  }

  onSubmit = ({ password }: FormValues) => {
    console.log('onsubmit')
    const create = this.props.query.allDbs.length === 0
    if (create) {
      const { createDb, login } = this.props
      createDb({ name: 'appdb', password }, { complete: login })
    } else {
      const { openDb, login } = this.props
      const dbId = this.props.query.allDbs[0].dbId
      openDb({ password, dbId }, { complete: login })
    }
  }

  confirmDelete = () => {
    const { intl: { formatMessage } } = this.props
    confirm({
      title: messages.deleteTitle,
      action: messages.delete,
      onConfirm: this.deleteDb,
      formatMessage
    })
  }

  deleteDb = () => {
    const { deleteDb } = this.props
    const dbId = this.props.query.allDbs[0].dbId
    const variables = { dbId }
    deleteDb(variables)
  }

  inputRef = (ref: any) => {
    this.confirmInput = ref
  }

  focusConfirmInput = () => {
    if (this.confirmInput && this.confirmInput.focus) {
      this.confirmInput.focus()
    }
  }
}

export const LoginForm = compose(
  injectIntl,
  withNav,
  withQuery({ query: Queries.Dbs }),
  withMutation({ openDb: Mutations.OpenDb }),
  withMutation({ createDb: Mutations.CreateDb }),
  withMutation({ deleteDb: Mutations.DeleteDb }),
)(LoginFormComponent)
LoginForm.displayName = 'LoginForm'

const messages = defineMessages({
  welcomeMessageCreate: {
    id: 'LoginForm.welcomeMessageCreate',
    defaultMessage: 'Welcome!  Create a password to secure your data.'
  },
  welcomeMessageOpen: {
    id: 'LoginForm.welcomeMessageOpen',
    defaultMessage: 'Welcome!  Enter your password to access your data.'
  },
  create: {
    id: 'LoginForm.create',
    defaultMessage: 'Create'
  },
  open: {
    id: 'LoginForm.open',
    defaultMessage: 'Open'
  },
  delete: {
    id: 'LoginForm.delete',
    defaultMessage: 'Delete'
  },
  deleteTitle: {
    id: 'LoginForm.deleteTitle',
    defaultMessage: 'Are you sure?'
  },
  valueEmpty: {
    id: 'LoginForm.valueEmpty',
    defaultMessage: 'Cannot be empty'
  },
  dbExists: {
    id: 'LoginForm.dbExists',
    defaultMessage: 'Database already exists'
  },
  passwordsMatch: {
    id: 'LoginForm.passwordsMatch',
    defaultMessage: 'Passwords must match'
  },
  nameLabel: {
    id: 'LoginForm.nameLabel',
    defaultMessage: 'Database Name'
  },
  namePlaceholder: {
    id: 'LoginForm.namePlaceholder',
    defaultMessage: 'My Database'
  },
  passwordLabel: {
    id: 'LoginForm.passwordLabel',
    defaultMessage: 'Password'
  },
  passwordPlaceholder: {
    id: 'LoginForm.passwordPlaceholder',
    defaultMessage: 'Required'
  },
  passwordConfirmLabel: {
    id: 'LoginForm.passwordConfirmLabel',
    defaultMessage: 'Confirm Password'
  },
  passwordConfirmPlaceholder: {
    id: 'LoginForm.passwordConfirmPlaceholder',
    defaultMessage: 'Required'
  },
  advanced: {
    id: 'LoginForm.advanced',
    defaultMessage: 'Advanced'
  }
})
