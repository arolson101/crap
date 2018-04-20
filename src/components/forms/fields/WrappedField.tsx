import * as React from 'react';
import { BoundFormAPI } from 'react-form';
import { FormattedMessage } from 'react-intl';
import { View, Text } from 'react-native';
import { ctx } from '../../ctx';
import { formStyles } from './formStyles';

export namespace WrappedField {
  export interface Props {
    label?: FormattedMessage.MessageDescriptor;
    fieldApi: BoundFormAPI;
  }
}

export const WrappedField: React.ComponentType<WrappedField.Props> =
  ({ fieldApi, label, children }, { intl }: ctx.Intl) => (
    <View style={formStyles.wrapper}>
      <View style={formStyles.inputContainer}>
        {label &&
          <Text style={formStyles.label}>{intl.formatMessage(label)}</Text>
        }
        {children}
      </View>
      {fieldApi.getTouched() && fieldApi.getError() &&
        <Text style={formStyles.errorSubtitle}>
          {fieldApi.getError()}
        </Text>
      }
    </View>
  );
WrappedField.contextTypes = ctx.intl;
