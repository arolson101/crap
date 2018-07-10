import * as React from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import { compose } from 'recompose'
import { AppBannerText, FormContent, WelcomeText, Button } from '../components'
import { typedFields } from '../components/fields'
import { Mutations, Queries } from '../db'
import { View } from 'native-base';

interface Props extends InjectedIntlProps {
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
  TextField
} = typedFields<FormValues>()

export class LoginFormComponent extends React.PureComponent<Props> {
  render () {
    const exists = this.props.query.allDbs.length > 0
    return (
      <>
        <AppBannerText>App</AppBannerText>
        {exists
          ? <FormOpen {...this.props} />
          : <FormCreate {...this.props} />
        }
      </>
    )
  }
}

export const LoginForm = compose(
  injectIntl,
  Queries.withDbs('query'),
  Mutations.withOpenDb('openDb'),
  Mutations.withCreateDb('createDb'),
  Mutations.withDeleteDb('deleteDb'),
)(LoginFormComponent)
LoginForm.displayName = 'LoginForm'

const FormCreate: React.SFC<Props> = (props) => {
  const { intl: { formatMessage } } = props

  return (
    <Form
      defaultValues={{
        password: '',
        passwordConfirm: ''
      }}
      validate={values => ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
        passwordConfirm: (values.password !== values.passwordConfirm) ? formatMessage(messages.passwordsMatch)
          : undefined
      })}
      onSubmit={({ password }) => {
        const variables = { name: 'appdb', password }
        props.createDb(variables)
      }}
    >
      {formApi =>
        <FormContent>
          <WelcomeText>Welcome!  Create a password to secure your data.</WelcomeText>
          <TextField
            autoFocus
            secure
            field='password'
            label={messages.passwordLabel}
            placeholder={messages.passwordPlaceholder}
          />
          <TextField
            secure
            field='passwordConfirm'
            label={messages.passwordConfirmLabel}
            placeholder={messages.passwordConfirmPlaceholder}
          />
          <Button
            block
            // disabled={props.createDb.loading}
            onPress={formApi.submitForm}
            title={messages.create}
          />
        </FormContent>
      }
    </Form>
  )
}

const FormOpen: React.SFC<Props> = (props) => {
  const { intl: { formatMessage } } = props

  return (
    <Form
      defaultValues={{
        password: ''
      }}
      validate={values => ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined
      })}
      onSubmit={({ password }) => {
        const dbId = props.query.allDbs[0].dbId
        props.openDb({ password, dbId })
      }}
    >
      {formApi =>
        <FormContent>
          <WelcomeText>Welcome!  Enter your password to access your data.</WelcomeText>
          <TextField
            secure
            autoFocus
            field='password'
            label={messages.passwordLabel}
            placeholder={messages.passwordPlaceholder}
            // returnKeyType="default"
            onSubmitEditing={formApi.submitForm}
          />
          <Button
            block
            // disabled={props.openDb.loading}
            onPress={formApi.submitForm}
            title={messages.open}
          />
          <Button
            block
            onPress={() => {
              const dbId = props.query.allDbs[0].dbId
              const variables = { dbId }
              props.deleteDb(variables)
            }}
            title={messages.delete}
          />
        </FormContent>
      }
    </Form>
  )
}

const messages = defineMessages({
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
