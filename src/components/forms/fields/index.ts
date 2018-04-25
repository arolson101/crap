import * as RF from 'react-form'
import { CheckboxField } from './CheckboxField'
import { CollapseField } from './CollapseField'
import { ErrorMessage } from '../../ErrorMessage'
import { MultilineTextField } from './MultilineTextField'
import { SelectField } from './SelectField'
import { SubmitButton } from './SubmitButton'
import { TextField } from './TextField'
import { UrlField } from './UrlField'

export type SelectFieldItem = SelectField.Item

export const typedFields = <V extends {}>() => {
  return {
    Form: RF.Form as React.ComponentClass<RF.FormProps<V>>,
    CheckboxField: CheckboxField as React.StatelessComponent<CheckboxField.Props<V>>,
    CollapseField: CollapseField as React.StatelessComponent<CollapseField.Props<V>>,
    ErrorMessage,
    TextField: TextField as React.StatelessComponent<TextField.Props<V>>,
    SelectField: SelectField as React.StatelessComponent<SelectField.Props<V>>,
    MultilineTextField: MultilineTextField as React.StatelessComponent<MultilineTextField.Props<V>>,
    UrlField: UrlField as React.StatelessComponent<UrlField.Props<V>>,
    SubmitButton
    // DateField: DateField as React.ComponentClass<DateFieldProps<V>>,
    // AccountField: AccountField as React.ComponentClass<AccountFieldProps<V>>,
    // BudgetField: BudgetField as React.ComponentClass<BudgetFieldProps<V>>,
    // ColorAddon: ColorAddonField as React.ComponentClass<ColorAddonFieldProps<V>>,
  }
}
