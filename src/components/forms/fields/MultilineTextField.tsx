import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';
import { WrappedField } from './WrappedField';

export namespace MultilineTextField {
  export interface Props<T = {}> extends FieldProps<T> {
    placeholder: FormattedMessage.MessageDescriptor;
    rows: number;
    textColor?: string;
    autoFocus?: boolean;
  }
}

const MultilineTextFieldComponent: React.ComponentType<MultilineTextField.Props & FormFieldProps> =
  ({ fieldApi, autoFocus, textColor, placeholder, rows }, { intl }: ctx.Intl) => (
    <WrappedField fieldApi={fieldApi}>
      <TextInput
        style={[
          formStyles.control,
          formStyles.textInput,
          { color: textColor }
        ]}
        multiline={true}
        numberOfLines={rows}
        onChangeText={fieldApi.setValue}
        value={fieldApi.getValue()}
        placeholder={intl.formatMessage(placeholder)}
      />
    </WrappedField>
  );
MultilineTextFieldComponent.contextTypes = ctx.intl;

export const MultilineTextField = FormField<MultilineTextField.Props>(MultilineTextFieldComponent);
MultilineTextField.displayName = 'MultilineTextField';
