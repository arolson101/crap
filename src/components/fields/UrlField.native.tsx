import isUrl from 'is-url'
import { Button, Input, Item, Text, Thumbnail, NativeBase, Spinner, ActionSheet } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldProps, FormikProps } from 'formik'
import { defineMessages, FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import { TextInput } from 'react-native'
import { FavicoProps, getFavico, getFavicoFromLibrary } from '../../util/getFavico'
import { Label } from './Label.native'
import { UrlFieldProps } from './UrlField'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export namespace UrlField {
  export type Props<Values> = UrlFieldProps<Values>
}

interface State {
  gettingIcon: boolean
}

export class UrlFieldComponent<Values> extends React.Component<UrlField.Props<Values> & InjectedIntlProps, State> {
  private textInput: TextInput
  private form: FormikProps<Values>
  private originalValue: string | undefined = undefined

  state: State = {
    gettingIcon: false
  }

  focusTextInput = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  render() {
    const { field: name, favicoField, autoFocus, label, placeholder, onSubmitEditing, returnKeyType } = this.props
    return (
      <Field name={name} pure={false}>
        {({ field, form }: FieldProps<Values>) => {
          this.form = form
          const error = !!(form.touched[name] && form.errors[name])
          const inputProps = { autoFocus, onPress: this.focusTextInput }
          if (this.originalValue === undefined) {
            this.originalValue = field.value
          }
          return (
            <FormattedMessage {...placeholder || messages.empty}>
              {(placeholderText: string) =>
                <Item
                  inlineLabel
                  error={error}
                  {...inputProps}
                  placeholder={placeholderText}
                >
                  <Label label={label} error={error} />

                  <Field field={favicoField} pure={false}>
                    {({ field: iconField }: FieldProps<Values>) => {
                      return (
                        <FavicoButton
                          loading={this.state.gettingIcon}
                          value={iconField.value}
                          bordered
                          onPress={this.onIconButtonPressed}
                          style={{ alignSelf: 'center', padding: platform.buttonPadding }}
                        />
                      )
                    }}
                  </Field>

                  <NotifyingInput
                    style={{ flex: 1 }}
                    keyboardType='url'
                    autoFocus={autoFocus}
                    onChangeText={text => form.setFieldValue(name, text)}
                    value={field.value}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    ref={(ref: any) => this.textInput = ref && ref._root}
                    onValueChanged={this.onValueChanged}
                  />
                </Item>
              }
            </FormattedMessage>
          )
        }}
      </Field>
    )
  }

  onValueChanged = (value: string) => {
    this.maybeGetIcon(value)
  }

  maybeGetIcon = async (value: string, force: boolean = false) => {
    console.log('maybeGetIcon', { value })
    const { favicoField } = this.props

    if (!isUrl(value)) {
      console.log(`not looking up icon '${value}' is not an URL`)
      return
    }

    const iconValue = this.form.values[favicoField]
    if (iconValue && !force) {
      const iconProps = JSON.parse(iconValue as any) as FavicoProps
      if (iconProps.from === value) {
        console.log(`not looking up icon because we already got it from ${value}`)
        return
      }

      if (iconProps.from !== this.originalValue) {
        console.log(`not changing icon because it was from ${iconProps.from}, not ${this.originalValue}`)
        return
      }
    }

    try {
      this.setState({ gettingIcon: true })
      const icon = await getFavico(value)
      this.form.setFieldValue(favicoField, JSON.stringify(icon))
      this.originalValue = icon.from
    } catch (ex) {
      console.warn(ex.message)
    } finally {
      this.setState({ gettingIcon: false })
    }
  }

  redownload = async () => {
    const { favicoField, field } = this.props
    this.form.setFieldValue(favicoField, '')
    this.maybeGetIcon(this.form.values[field] as any, true)
  }

  getFromLibrary = async () => {
    const { favicoField } = this.props
    const icon = await getFavicoFromLibrary()
    this.form.setFieldValue(favicoField, JSON.stringify(icon))
    this.originalValue = icon.from
  }

  onIconButtonPressed = () => {
    const { intl, label, favicoField } = this.props
    const options: string[] = [
      intl.formatMessage(messages.reset),
      intl.formatMessage(messages.redownload),
      intl.formatMessage(messages.library),
      intl.formatMessage(messages.cancel)
    ]
    const cancelButtonIndex = 3
    ActionSheet.show(
      {
        options,
        cancelButtonIndex,
        title: intl.formatMessage(label)
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: // reset
            this.form.setFieldValue(favicoField, '')
            break
          case 1: // redownload
            this.redownload()
            break
          case 2: // library
            this.getFromLibrary()
            break
        }
      }
    )
  }
}

interface NotifyingInputProps extends NativeBase.Input {
  onValueChanged: (newValue: string, oldValue: string) => any
}

class NotifyingInput extends React.Component<NotifyingInputProps> {
  componentDidUpdate(prevProps: NotifyingInputProps) {
    const { value, onValueChanged } = this.props
    if (prevProps.value !== value) {
      onValueChanged(value || '', prevProps.value || '')
    }
  }

  render() {
    return <Input {...this.props} />
  }
}

interface FavicoButtonProps extends NativeBase.Button {
  value: string
  loading: boolean
}

class FavicoButton extends React.Component<FavicoButtonProps> {
  render() {
    const { value, loading, ...props } = this.props
    const favico = value ? JSON.parse(value) as FavicoProps : undefined
    return (
      <Button {...props}>
        {loading
          ? <Spinner />
          : favico
            ? <Thumbnail style={{ backgroundColor: 'transparent' }} square small {...favico} />
            : <FontAwesome name='bank' />
        }
      </Button>
    )
  }
}

export const UrlField = injectIntl(UrlFieldComponent as any)

const messages = defineMessages({
  empty: {
    id: 'empty',
    defaultMessage: ''
  },
  library: {
    id: 'UrlField.library',
    defaultMessage: 'Choose from library'
  },
  reset: {
    id: 'UrlField.reset',
    defaultMessage: 'Reset to default'
  },
  redownload: {
    id: 'UrlField.redownload',
    defaultMessage: 'Download again'
  },
  cancel: {
    id: 'UrlField.cancel',
    defaultMessage: 'Cancel'
  },
})
