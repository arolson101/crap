import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ListItem, IconObject } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  placeholder: FormattedMessage.MessageDescriptor;
  leftIcon?: IconObject;
  rows: number;
}

export const MultilineTextField: React.ComponentType<Props> = FormField(injectIntl(
  ({ fieldApi, leftIcon, placeholder, rows, intl }: Props & FormFieldProps & InjectedIntlProps) => (
    <ListItem
      leftIcon={leftIcon}
      title={
        <TextInput
          multiline
          numberOfLines={rows}
          onChangeText={fieldApi.setValue}
          value={fieldApi.getValue()}
          placeholder={intl.formatMessage(placeholder)}
        />
      }
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      hideChevron
    />
  )
));
