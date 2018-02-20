import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { ListItem, IconObject } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  label: FormattedMessage.MessageDescriptor;
  leftIcon?: IconObject;
}

export const CheckboxField: React.ComponentType<Props> = FormField(injectIntl(
  ({ fieldApi, leftIcon, label, intl }: Props & FormFieldProps & InjectedIntlProps) => (
    <ListItem
      wrapperStyle={formStyles.wrapperStyle}
      leftIcon={leftIcon}
      title={intl.formatMessage(label)}
      switchButton
      switched={fieldApi.getValue()}
      onSwitch={fieldApi.setValue}
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      hideChevron
    />
  )
));
