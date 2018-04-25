import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ctx } from '../../ctx';
import { glamorous, ThemeProp } from '../../Theme';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { WrappedField } from './WrappedField';

const TextInput = glamorous.textInput<ThemeProp & { error: any }>({},
  ({ theme, error }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: theme.controlFontColor,
  })
);
TextInput.displayName = 'TextInput';

export namespace MultilineTextField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    placeholder?: FormattedMessage.MessageDescriptor;
    rows: number;
    autoFocus?: boolean;
  }
}

const MultilineTextFieldComponent: React.ComponentType<MultilineTextField.Props & FormFieldProps> =
  ({ fieldApi, autoFocus, label, placeholder, rows }, { intl }: ctx.Intl) => {
    const error = fieldApi.getTouched() && fieldApi.getError();
    return (
      <WrappedField label={label} fieldApi={fieldApi}>
        <TextInput
          error={error}
          autoFocus={autoFocus}
          multiline={true}
          numberOfLines={rows}
          onChangeText={fieldApi.setValue}
          value={fieldApi.getValue()}
          placeholder={placeholder && intl.formatMessage(placeholder)}
        />
      </WrappedField>
    )
  };
MultilineTextFieldComponent.contextTypes = ctx.intl;

export const MultilineTextField = FormField<MultilineTextField.Props>(MultilineTextFieldComponent);
MultilineTextField.displayName = 'MultilineTextField';
