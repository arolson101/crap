import * as RF from 'react-form';
import {
  CheckboxField,
  CollapseField,
  ErrorMessage,
  MultilineTextField,
  SelectField,
  SubmitButton,
  TextField,
  UrlField,
} from './fields';

export type SelectFieldItem = SelectField.Item;

export const typedFields = <V extends {}>() => {
  return {
    Form: RF.Form as React.ComponentClass<RF.FormProps<V>>,
    CheckboxField: CheckboxField as React.ComponentClass<CheckboxField.Props<V>>,
    CollapseField: CollapseField as React.ComponentClass<CollapseField.Props<V>>,
    ErrorMessage,
    TextField: TextField as React.ComponentClass<TextField.Props<V>>,
    SelectField: SelectField as React.ComponentClass<SelectField.Props<V>>,
    MultilineTextField: TextField as React.ComponentClass<MultilineTextField.Props<V>>,
    UrlField: UrlField as React.ComponentClass<UrlField.Props<V>>,
    SubmitButton,
    // DateField: DateField as React.ComponentClass<DateFieldProps<V>>,
    // AccountField: AccountField as React.ComponentClass<AccountFieldProps<V>>,
    // BudgetField: BudgetField as React.ComponentClass<BudgetFieldProps<V>>,
    // ColorAddon: ColorAddonField as React.ComponentClass<ColorAddonFieldProps<V>>,
  };
};
