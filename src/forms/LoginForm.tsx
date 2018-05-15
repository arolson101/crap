import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'recompose'
import { Queries, Mutations } from '../db'
import { ctx } from '../App/ctx'
import { typedFields } from '../components/fields'
import { Classes, Intent, Spinner } from '@blueprintjs/core'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { AppBannerText, WelcomeText, FormContent } from '../components'

interface Props {
  query: Queries.Dbs
  openDb: Mutations.OpenDb
}

interface FormValues {
  password: string
  passwordConfirm: string
}

const {
  Form,
  ErrorMessage,
  SubmitButton,
  TextField
} = typedFields<FormValues>()

export class LoginFormComponent extends React.PureComponent<Props> {
  render () {
    if (this.props.query.loading) {
      return null
    }

    if (this.props.query.error) {
      return <ErrorMessage error={this.props.query.error} />
    }

    const exists = this.props.query.data.dbs.length > 0
    return (
      // <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />
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
  Queries.withDbs('query'),
  Mutations.withOpenDb('openDb')
)(LoginFormComponent)
LoginForm.displayName = 'LoginForm'

const FormCreate: React.SFC<Props> = (props, context: ctx.Intl) => {
  const { intl: { formatMessage } } = context

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
      onSubmit={variables => {
        return props.openDb.execute({ variables })
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
          <ErrorMessage error={props.openDb.error} />
          <SubmitButton
            disabled={props.openDb.loading}
            onPress={formApi.submitForm}
            title={messages.create}
          />
        </FormContent>
      }
    </Form>
  )
}
FormCreate.contextTypes = ctx.intl

const FormOpen: React.SFC<Props> = (props, context: ctx.Intl) => {
  const { intl: { formatMessage } } = context

  return (
    <Form
      defaultValues={{
        password: ''
      }}
      validate={values => ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined
      })}
      onSubmit={async variables => {
        try {
          await props.openDb.execute({ variables })
        } catch (err) {
          console.warn(err)
        }
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
          <ErrorMessage error={props.openDb.error} />
          <SubmitButton
            disabled={props.openDb.loading}
            onPress={formApi.submitForm}
            title={messages.open}
          />
        </FormContent>
      }
    </Form>
  )
}
FormOpen.contextTypes = { ...ctx.intl }

const messages = defineMessages({
  create: {
    id: 'LoginForm.create',
    defaultMessage: 'Create'
  },
  open: {
    id: 'LoginForm.open',
    defaultMessage: 'Open'
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
