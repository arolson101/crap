import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ctx } from '../../ctx';
import { glamorous, ThemeProp } from '../../Theme';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { WrappedField } from './WrappedField';

const TextInput = glamorous.textInput<ThemeProp & { error: boolean }>({},
  ({ theme, error }) => ({
    borderWidth: theme.boxBorderWidth,
    borderColor: error ? theme.boxBorderColorError : theme.boxBorderColor,
    fontSize: theme.controlFontSize,
    color: theme.controlFontColor,
  })
);

export namespace UrlField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    placeholder?: FormattedMessage.MessageDescriptor;
  }
}

const UrlFieldComponent: React.SFC<UrlField.Props & FormFieldProps> =
  ({ fieldApi, label, placeholder }, { intl }: ctx.Intl) => {
    const error = !!(fieldApi.getTouched() && fieldApi.getError());
    return (
      <WrappedField label={label} fieldApi={fieldApi}>
        <TextInput
          error={error}
          onChangeText={fieldApi.setValue}
          value={fieldApi.getValue()}
          placeholder={placeholder && intl.formatMessage(placeholder)}
        />
      </WrappedField>
    )
  };
UrlFieldComponent.contextTypes = ctx.intl;

export const UrlField = FormField<UrlField.Props>(UrlFieldComponent);
UrlField.displayName = 'UrlField';
