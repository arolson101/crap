import { CheckboxField } from './CheckboxField'
import { CurrencyField } from './CurrencyField'
import { DateField } from './DateField'
import { Divider } from './Divider'
import { ErrorMessage } from '../ErrorMessage'
import { Form } from './Form'
import { SelectField } from './SelectField'
import { TextField } from './TextField'
import { UrlField } from './UrlField'

export type SelectFieldItem = SelectField.Item

export const typedFields = <V extends {}>() => {
  return {
    Form: Form as any as React.ComponentType<Form.Props<V>>,
    CheckboxField: CheckboxField as React.ComponentType<CheckboxField.Props<V>>,
    CurrencyField: CurrencyField as React.ComponentType<CurrencyField.Props<V>>,
    DateField: DateField as React.ComponentType<DateField.Props<V>>,
    Divider,
    ErrorMessage,
    TextField: TextField as React.ComponentType<TextField.Props<V>>,
    SelectField: SelectField as React.ComponentType<SelectField.Props<V>>,
    UrlField: UrlField as unknown as React.ComponentType<UrlField.Props<V>>,
    // AccountField: AccountField as React.ComponentClass<AccountFieldProps<V>>,
    // BudgetField: BudgetField as React.ComponentClass<BudgetFieldProps<V>>,
    // ColorAddon: ColorAddonField as React.ComponentClass<ColorAddonFieldProps<V>>,
  }
}
