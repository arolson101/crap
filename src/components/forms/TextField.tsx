import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
import { TextInput, TouchableWithoutFeedback, } from 'react-native';
import { ListItem } from 'react-native-elements';
import { formStyles } from './formStyles';

interface Props extends FieldProps {
  label: string;
  placeholder: string;
  secure?: boolean;
}

const TextFieldComponent: React.SFC<Props & FormFieldProps> = ({ fieldApi, label, placeholder, secure }) => (
  <ListItem
    title={label}
    textInput
    textInputPlaceholder={placeholder}
    subtitle={fieldApi.getError()}
    subtitleStyle={formStyles.errorSubtitle}
    hideChevron
    textInputSecure={secure}
  />
);

export const TextField: React.ComponentType<Props> = FormField(TextFieldComponent);
