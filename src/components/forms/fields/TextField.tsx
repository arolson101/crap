import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { ListItem, IconObject } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  label: FormattedMessage.MessageDescriptor;
  placeholder: FormattedMessage.MessageDescriptor;
  secure?: boolean;
  leftIcon?: IconObject;
  rows?: number;
}

export const TextField: React.ComponentType<Props> = FormField(injectIntl(
  ({ fieldApi, leftIcon, label, placeholder, secure, rows, intl }: Props & FormFieldProps & InjectedIntlProps) => (
    <ListItem
      wrapperStyle={formStyles.wrapperStyle}
      leftIcon={leftIcon}
      title={intl.formatMessage(label)}
      textInput
      textInputMultiline={(rows ? rows > 0 : undefined)}
      textInputPlaceholder={intl.formatMessage(placeholder)}
      textInputValue={fieldApi.getValue()}
      textInputOnChangeText={fieldApi.setValue}
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      hideChevron
      textInputSecure={secure}
    />
  )
));