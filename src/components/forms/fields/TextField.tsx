import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';
import { WrappedField } from './WrappedField';

export namespace TextField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    placeholder: FormattedMessage.MessageDescriptor;
    secure?: boolean;
    rows?: number;
    textColor?: string;
    autoFocus?: boolean;
  }
}

const TextFieldComponent: React.ComponentType<TextField.Props & FormFieldProps> =
  ({ fieldApi, autoFocus, label, textColor, placeholder, secure, rows }, { intl }: ctx.Intl) => {
    const error = fieldApi.getTouched() && fieldApi.getError();
    return (
      <WrappedField label={label} fieldApi={fieldApi}>
        <TextInput
          style={[
            formStyles.control,
            formStyles.textInput,
            { color: textColor },
            error ? formStyles.errorTextInput : undefined,
          ]}
          multiline={(rows ? rows > 0 : undefined)}
          numberOfLines={rows}
          onChangeText={fieldApi.setValue}
          value={fieldApi.getValue()}
          secureTextEntry={secure}
          placeholder={intl.formatMessage(placeholder)}
        />
      </WrappedField>
    );
  };
TextFieldComponent.contextTypes = ctx.intl;

export const TextField = FormField<TextField.Props>(TextFieldComponent);
TextField.displayName = 'TextField';
