import * as React from 'react'
import { defineMessages } from 'react-intl'
import { Text, View } from 'react-native'
import { compose } from 'recompose'
import { Queries, Mutations } from '../../db'
import { ctx } from '../../App/ctx'
import { typedFields } from './fields'
import { Classes, Intent, Spinner } from "@blueprintjs/core"
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'normalize.css/normalize.css'
import { Grid, Row, Col } from 'react-flexbox-grid'

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
      <View style={{ flexDirection: 'column', alignItems: 'center', margin: 100 }}>
        <Text style={{ fontSize: 80, margin: 20 }}>App</Text>
        <View style={{ maxWidth: 400 }}>
          {exists
            ? <FormOpen {...this.props}/>
            : <FormCreate {...this.props}/>
          }
        </View>
      </View>
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
        <View>
          <Text style={{ marginBottom: 20, textAlign: 'center' }}>Welcome!  Create a password to secure your data.</Text>
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
        </View>
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
        <View>
          <Text style={{ marginBottom: 20, textAlign: 'center' }}>Welcome!  Enter your password to access your data.</Text>
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
        </View>
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
