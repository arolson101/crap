import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { FormattedMessage } from 'react-intl';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  label: FormattedMessage.MessageDescriptor;
  placeholder: FormattedMessage.MessageDescriptor;
  secure?: boolean;
  leftIcon?: IconObject;
  rows?: number;
  textColor?: string;
  autoFocus?: boolean;
}

const TextFieldComponent: React.ComponentType<Props & FormFieldProps> =
  ({ fieldApi, leftIcon, autoFocus, label, textColor, placeholder, secure, rows }, { intl }: ctx.Intl) => (
    <ListItem
      textInputAutoFocus={autoFocus}
      wrapperStyle={formStyles.wrapperStyle}
      leftIcon={leftIcon}
      title={intl.formatMessage(label)}
      textInput
      textInputStyle={{color: textColor}}
      textInputMultiline={(rows ? rows > 0 : undefined)}
      textInputPlaceholder={intl.formatMessage(placeholder)}
      textInputValue={fieldApi.getValue()}
      textInputOnChangeText={fieldApi.setValue}
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      hideChevron
      textInputSecure={secure}
    />
  );
TextFieldComponent.contextTypes = ctx.intl;

export const TextField = FormField(TextFieldComponent) as React.ComponentClass<Props>;
TextField.displayName = 'TextField';
