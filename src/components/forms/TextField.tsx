import * as React from 'react';
import { FormField, FieldProps, FormFieldProps } from 'react-form';
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
    wrapperStyle={formStyles.wrapperStyle}
    textInput
    textInputPlaceholder={placeholder}
    textInputValue={fieldApi.getValue()}
    textInputOnChangeText={fieldApi.setValue}
    subtitle={fieldApi.getTouched() ? fieldApi.getError() : undefined}
    subtitleStyle={formStyles.errorSubtitle}
    hideChevron
    textInputSecure={secure}
  />
);

export const TextField: React.ComponentType<Props> = FormField(TextFieldComponent);
