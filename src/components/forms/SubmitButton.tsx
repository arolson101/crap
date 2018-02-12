import * as React from 'react';
import { TouchableHighlight, Platform } from 'react-native';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Button } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props {
  title: FormattedMessage.MessageDescriptor;
  onPress: Function;
}

const TouchableComponent = Platform.OS === 'web' ? TouchableHighlight : undefined;

export const SubmitButton: React.ComponentType<Props> = injectIntl(
  ({ title, onPress, intl: { formatMessage } }: Props & InjectedIntlProps) => (
    <Button
      TouchableComponent={TouchableComponent}
      text={formatMessage(title)}
      onPress={() => onPress()}
      buttonStyle={formStyles.button}
      containerStyle={formStyles.buttonContainer}
    />
  )
);
