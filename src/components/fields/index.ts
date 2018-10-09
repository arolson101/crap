// import * as RF from 'react-form'
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
    Form: Form as any as React.ComponentClass<Form.Props<V>>,
    CheckboxField: CheckboxField as React.ComponentClass<CheckboxField.Props<V>>,
    CurrencyField: CurrencyField as React.ComponentClass<CurrencyField.Props<V>>,
    DateField: DateField as React.ComponentClass<DateField.Props<V>>,
    Divider,
    ErrorMessage,
    TextField: TextField as React.ComponentClass<TextField.Props<V>>,
    SelectField: SelectField as React.StatelessComponent<SelectField.Props<V>>,
    UrlField: UrlField as React.ComponentClass<UrlField.Props<V>>,
    // DateField: DateField as React.ComponentClass<DateFieldProps<V>>,
    // AccountField: AccountField as React.ComponentClass<AccountFieldProps<V>>,
    // BudgetField: BudgetField as React.ComponentClass<BudgetFieldProps<V>>,
    // ColorAddon: ColorAddonField as React.ComponentClass<ColorAddonFieldProps<V>>,
  }
}
