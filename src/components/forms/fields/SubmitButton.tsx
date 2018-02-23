import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TouchableHighlight, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { ctx } from '../../ctx';
import { formStyles } from './formStyles';

interface Props {
  title: FormattedMessage.MessageDescriptor;
  onPress: Function;
}

const TouchableComponent = Platform.OS === 'web' ? TouchableHighlight : undefined;

export const SubmitButton: React.ComponentType<Props> =
  ({ title, onPress }: Props, { intl }: ctx.Intl) => (
    <Button
      TouchableComponent={TouchableComponent}
      text={intl.formatMessage(title)}
      onPress={() => onPress()}
      buttonStyle={formStyles.button}
      containerStyle={formStyles.buttonContainer}
    />
  );
SubmitButton.contextTypes = ctx.intl;
