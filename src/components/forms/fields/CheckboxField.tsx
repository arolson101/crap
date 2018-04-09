import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { FormField, FormFieldProps, FieldProps } from './FieldProps';
import { formStyles } from './formStyles';

export namespace CheckboxField {
  export interface Props<T = {}> extends FieldProps<T> {
    label: FormattedMessage.MessageDescriptor;
    // leftIcon?: IconObject;
  }
}

const CheckboxFieldComponent: React.SFC<CheckboxField.Props & FormFieldProps> =
  ({ fieldApi, /*leftIcon,*/ label }, { intl }: ctx.Intl) => (
    <ListItem
      // wrapperStyle={formStyles.wrapperStyle}
      // leftIcon={leftIcon}
      title={intl.formatMessage(label)}
      switch={{
        onValueChange: fieldApi.setValue,
        value: fieldApi.getValue(),
      }}
      subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
      subtitleStyle={formStyles.errorSubtitle}
      chevron={false}
    />
  );
CheckboxFieldComponent.contextTypes = ctx.intl;

export const CheckboxField = FormField<CheckboxField.Props>(CheckboxFieldComponent);
CheckboxField.displayName = 'CheckboxField';
