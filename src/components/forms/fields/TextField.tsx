import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReturnKeyType } from 'react-native';
import { ctx } from '../../ctx';
import { glamorous, ThemeProp } from '../../Theme';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { WrappedField } from './WrappedField';

const TextInput = glamorous.textInput<ThemeProp & { error: any, textColor?: string }>({},
  ({ theme, error, textColor }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: textColor ? textColor : theme.controlFontColor,
  })
);
TextInput.displayName = 'TextInput';

export namespace TextField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    placeholder: FormattedMessage.MessageDescriptor;
    secure?: boolean;
    rows?: number;
    textColor?: string;
    autoFocus?: boolean;
    onSubmitEditing?: () => any;
    returnKeyType?: ReturnKeyType;
  }
}

const TextFieldComponent: React.ComponentType<TextField.Props & FormFieldProps> =
  ({ fieldApi, autoFocus, label, textColor, placeholder, secure, rows, onSubmitEditing, returnKeyType }, { intl }: ctx.Intl) => {
    const error = fieldApi.getTouched() && fieldApi.getError();
    return (
      <WrappedField label={label} fieldApi={fieldApi}>
        <TextInput
          error={error}
          autoFocus={autoFocus}
          multiline={(rows ? rows > 0 : undefined)}
          numberOfLines={rows}
          onChangeText={fieldApi.setValue}
          value={fieldApi.getValue()}
          secureTextEntry={secure}
          placeholder={intl.formatMessage(placeholder)}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
      </WrappedField>
    );
  };
TextFieldComponent.contextTypes = ctx.intl;

export const TextField = FormField<TextField.Props>(TextFieldComponent);
TextField.displayName = 'TextField';
