import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';

export namespace MultilineTextField {
  export interface Props<T = {}> extends FieldProps<T> {
    placeholder: FormattedMessage.MessageDescriptor;
    leftIcon?: IconObject;
    rows: number;
  }
}

const MultilineTextFieldComponent: React.SFC<MultilineTextField.Props & FormFieldProps> =
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

export const MultilineTextField = FormField<MultilineTextField.Props>(MultilineTextFieldComponent);
MultilineTextField.displayName = 'MultilineTextField';
