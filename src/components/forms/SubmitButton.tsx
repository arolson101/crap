import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Button } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props {
  title: FormattedMessage.MessageDescriptor;
  onPress: Function;
}

export const SubmitButton: React.ComponentType<Props> = injectIntl(
  ({ title, onPress, intl: { formatMessage } }: Props & InjectedIntlProps) => (
    <Button
      title={formatMessage(title)}
      onPress={() => onPress()}
      style={formStyles.button}
      {...{ primary1: true }}
    />
  )
);
