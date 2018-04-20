import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
// import { formStyles } from './formStyles';

export namespace TextField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    placeholder: FormattedMessage.MessageDescriptor;
    secure?: boolean;
    leftIcon?: IconObject;
    rows?: number;
    textColor?: string;
    autoFocus?: boolean;
  }
}

const TextFieldComponent: React.ComponentType<TextField.Props & FormFieldProps> =
  ({ fieldApi, leftIcon, autoFocus, label, textColor, placeholder, secure, rows }, { intl }: ctx.Intl) => (
    <ListItem
      // textInputAutoFocus={autoFocus}
      // wrapperStyle={formStyles.wrapperStyle}
      // leftIcon={leftIcon}
      title={intl.formatMessage(label)}
      input={{
        inputStyle: {color: textColor},
        onChangeText: fieldApi.setValue,
        multiline: (rows ? rows > 0 : undefined),
        placeholder: intl.formatMessage(placeholder),
        value: fieldApi.getValue(),
      }}
      // subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      // subtitleStyle={formStyles.errorSubtitle}
      // hideChevron
      // textInputSecure={secure}
    />
  );
TextFieldComponent.contextTypes = ctx.intl;

export const TextField = FormField<TextField.Props>(TextFieldComponent);
TextField.displayName = 'TextField';
