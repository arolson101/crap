import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';
import { WrappedField } from './WrappedField';

export namespace UrlField {
  export interface Props<T = {}> extends FieldProps<T> {
    placeholder: FormattedMessage.MessageDescriptor;
  }
}

const UrlFieldComponent: React.SFC<UrlField.Props & FormFieldProps> =
  ({ fieldApi, placeholder }, { intl }: ctx.Intl) => (
    <WrappedField fieldApi={fieldApi}>
      <TextInput
        style={[
          formStyles.control,
          {color: fieldApi.getValue()}
        ]}
        onChangeText={fieldApi.setValue}
        value={fieldApi.getValue()}
        placeholder={intl.formatMessage(placeholder)}
      />
    </WrappedField>
  );
UrlFieldComponent.contextTypes = ctx.intl;

export const UrlField = FormField<UrlField.Props>(UrlFieldComponent);
UrlField.displayName = 'UrlField';
