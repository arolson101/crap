import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  placeholder: FormattedMessage.MessageDescriptor;
  leftIcon?: IconObject;
  rows: number;
}

const MultilineTextFieldComponent: React.SFC<Props & FormFieldProps> =
  ({ fieldApi, leftIcon, placeholder, rows }, { intl }: ctx.Intl) => (
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
  );
MultilineTextFieldComponent.contextTypes = ctx.intl;

export const MultilineTextField: React.ComponentClass<Props> = FormField(MultilineTextFieldComponent);
MultilineTextField.displayName = 'MultilineTextField';
