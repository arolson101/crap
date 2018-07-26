import isUrl from 'is-url'
import { Button, Input, Item, Text, Thumbnail } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { Field, FieldAPI } from 'react-form'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { TextInput } from 'react-native'
import { FavicoProps, getFavico } from '../../util/getFavico'
import { Label } from './Label.native'
import { UrlFieldProps } from './UrlField'

export namespace UrlField {
  export type Props<T = {}> = UrlFieldProps<T>
}

class UrlFieldComponent extends React.Component<UrlField.Props & InjectedIntlProps> {
  private textInput: TextInput
  private fieldApi: FieldAPI<any>
  private iconFieldApi: FieldAPI<any>
  private originalValue: string | undefined = undefined

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

              <Field field={favicoField}>
                {iconFieldApi => {
                  this.iconFieldApi = iconFieldApi
                  const props = iconFieldApi.value
                  console.log({ props })
                  return (
                    <Button
                      onPress={this.onIconButtonPressed}
                      style={{ alignSelf: 'center', padding: platform.buttonPadding, backgroundColor: '#FF9501' }}
                    >
                      {props
                        ? <Thumbnail square small {...(JSON.parse(props))} />
                        : <Text>foo</Text>
                      }
                    </Button>
                  )
                }}
              </Field>

              <Input
                style={{ flex: 1 }}
                keyboardType='url'
                autoFocus={autoFocus}
                onChangeText={this.onChangeText}
                value={fieldApi.value}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                ref={(ref: any) => this.textInput = ref && ref._root}
              />
            </Item>
          )
        }}
      </Field>
    )
  }

  preValidate = (value: string) => {
    console.log('preValidate', value)
  }

  onChangeText = (value: string) => {
    this.fieldApi.setValue(value)
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
      console.log(`getting icon for ${value}'`)
      const icon = await getFavico(value)
      this.iconFieldApi.setValue(JSON.stringify(icon))
      this.originalValue = icon.from
    } catch { }
  }

  onIconButtonPressed = () => {
    console.warn('press')
  }
}

export const UrlField = injectIntl<UrlField.Props>(UrlFieldComponent)
