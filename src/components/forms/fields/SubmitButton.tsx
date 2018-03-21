import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TouchableHighlight, Platform } from 'react-native';
import { Button } from 'react-native';
import { ctx } from '../../ctx';
import { formStyles } from './formStyles';

interface Props {
  title: FormattedMessage.MessageDescriptor;
  onPress: Function;
}

export const SubmitButton: React.ComponentType<Props> =
  ({ title, onPress }: Props, { intl }: ctx.Intl) => (
    <Button
      title={intl.formatMessage(title)}
      onPress={() => onPress()}
    />
  );
SubmitButton.contextTypes = ctx.intl;
