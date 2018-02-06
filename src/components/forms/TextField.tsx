import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { ListItem } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  label: FormattedMessage.MessageDescriptor;
  placeholder: FormattedMessage.MessageDescriptor;
  secure?: boolean;
}

export const TextField: React.ComponentType<Props> = FormField(injectIntl(
  ({ fieldApi, label, placeholder, secure, intl: { formatMessage } }: Props & FormFieldProps & InjectedIntlProps) => (
    <ListItem
      title={formatMessage(label)}
      wrapperStyle={formStyles.wrapperStyle}
      textInput
      textInputPlaceholder={formatMessage(placeholder)}
      textInputValue={fieldApi.getValue()}
      textInputOnChangeText={fieldApi.setValue}
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      hideChevron
      textInputSecure={secure}
    />
  )
));
