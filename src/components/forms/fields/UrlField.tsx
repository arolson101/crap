import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'react-native';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';

export namespace UrlField {
  export interface Props<T = {}> extends FieldProps<T> {
    placeholder: FormattedMessage.MessageDescriptor;
    leftIcon?: IconObject;
  }
}

const UrlFieldComponent: React.SFC<UrlField.Props & FormFieldProps> =
  ({ fieldApi, leftIcon, placeholder }, { intl }: ctx.Intl) => (
    <ListItem
      leftIcon={leftIcon}
      title={
        <TextInput
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
UrlFieldComponent.contextTypes = ctx.intl;

export const UrlField = FormField<UrlField.Props>(UrlFieldComponent);
UrlField.displayName = 'UrlField';
