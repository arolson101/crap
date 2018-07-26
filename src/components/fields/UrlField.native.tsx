import isUrl from 'is-url'
import { Button, Input, Item, Text, Thumbnail, NativeBase, Spinner } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { TextInput } from 'react-native'
import { FavicoProps, getFavico } from '../../util/getFavico'
import { Label } from './Label.native'
import { UrlFieldProps } from './UrlField'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export namespace UrlField {
  export type Props<T = {}> = UrlFieldProps<T>
}

interface State {
  gettingIcon: boolean
}

class UrlFieldComponent extends React.Component<UrlField.Props & InjectedIntlProps> {
  private textInput: TextInput
  private fieldApi: FieldAPI<any>
  private iconFieldApi: FieldAPI<any>
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
    const { field, favicoField, intl, autoFocus, label, placeholder, onSubmitEditing, returnKeyType } = this.props
    return (
      <Field field={field} pure={false}>
        {fieldApi => {
          this.fieldApi = fieldApi
          const error = !!(fieldApi.touched && fieldApi.error)
          const inputProps = { autoFocus, onPress: this.focusTextInput }
          if (this.originalValue === undefined) {
            this.originalValue = fieldApi.value
          }
          return (
            <Item
              inlineLabel
              error={error}
              {...inputProps}
              placeholder={placeholder && intl.formatMessage(placeholder)}
            >
              <Label label={label} error={error} />

              <Field field={favicoField} pure={false}>
                {iconFieldApi => {
                  this.iconFieldApi = iconFieldApi
                  return (
                    <FavicoButton
                      loading={this.state.gettingIcon}
                      value={iconFieldApi.value}
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
                onChangeText={fieldApi.setValue}
                value={fieldApi.value}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                ref={(ref: any) => this.textInput = ref && ref._root}
                onValueChanged={this.onValueChanged}
              />
            </Item>
          )
        }}
      </Field>
    )
  }

  onValueChanged = (value: string) => {
    this.maybeGetIcon(value)
  }

  maybeGetIcon = async (value: string) => {
    console.log('maybeGetIcon', { value })

    if (!isUrl(value)) {
      console.log(`not looking up icon '${value}' is not an URL`)
      return
    }

    const iconValue = this.iconFieldApi.value
    if (iconValue) {
      const iconProps = JSON.parse(iconValue) as FavicoProps
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
      this.iconFieldApi.setValue(JSON.stringify(icon))
      this.originalValue = icon.from
    } catch (ex) {
      console.warn(ex.message)
    } finally {
      this.setState({ gettingIcon: false })
    }
  }

  onIconButtonPressed = () => {
    console.warn('press')
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

export const UrlField = injectIntl<UrlField.Props>(UrlFieldComponent)
