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
}

const UrlFieldComponent: React.SFC<Props & FormFieldProps> =
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

export const UrlField = FormField(UrlFieldComponent) as React.ComponentClass<Props>;
UrlField.displayName = 'UrlField';
