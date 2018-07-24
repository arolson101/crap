import * as React from 'react'
import { defineMessages, InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import { AppBannerText, FormContent, WelcomeText, confirm } from '../components/index'
import { Button, View } from 'native-base'
import { typedFields } from '../components/fields/index'
import { Mutations, Queries } from '../db/index'
import { withMutation } from '../db/mutations/makeMutation'
import { withQuery } from '../db/queries/makeQuery'
import { GetImages, ImageProps } from '../util/getFavico'
import { Image } from 'react-native'

// const images = test()

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
  TextField,
} = typedFields<FormValues>()

interface State {
  images: ImageProps[] | undefined
}

export class LoginFormComponent extends React.Component<Props, State> {
  confirmInput: any
  state: State = { images: undefined }

  async componentDidMount() {
    const images = await GetImages()
    this.setState({ images })
  }

  render() {
    const create = this.props.query.allDbs.length === 0

    const defaultValues = {
      password: '',
      passwordConfirm: ''
    }

    return (
      <>
        <AppBannerText>App</AppBannerText>

        <Form
          defaultValues={defaultValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {formApi =>
            <FormContent>
              <WelcomeText>
                <FormattedMessage {...(create ? messages.welcomeMessageCreate : messages.welcomeMessageOpen)} />
              </WelcomeText>
              {this.state.images && this.state.images.map((imageProps, i) =>
                <Image key={i} {...imageProps} />
              )}
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

  validate = (values: FormValues) => {
    const { intl: { formatMessage } } = this.props
    const create = this.props.query.allDbs.length === 0

    if (create) {
      return ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined,
        passwordConfirm: (values.password !== values.passwordConfirm) ? formatMessage(messages.passwordsMatch)
          : undefined
      })
    } else {
      return ({
        password: !values.password.trim() ? formatMessage(messages.valueEmpty)
          : undefined
      })
    }
  }

  onSubmit = ({ password }: FormValues) => {
    const create = this.props.query.allDbs.length === 0
    if (create) {
      const { createDb } = this.props
      createDb({ name: 'appdb', password })
    } else {
      const { openDb } = this.props
      const dbId = this.props.query.allDbs[0].dbId
      openDb({ password, dbId })
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
