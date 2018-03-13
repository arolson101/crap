import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { FormattedMessage } from 'react-intl';
import { ListItem, IconObject } from 'react-native-elements';
import { ctx } from '../../ctx';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  label: FormattedMessage.MessageDescriptor;
  leftIcon?: IconObject;
}

const CheckboxFieldComponent: React.SFC<Props & FormFieldProps> =
  ({ fieldApi, leftIcon, label }, { intl }: ctx.Intl) => (
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
  );
CheckboxFieldComponent.contextTypes = ctx.intl;

export const CheckboxField = FormField(CheckboxFieldComponent) as React.ComponentClass<Props>;
CheckboxField.displayName = 'CheckboxField';
