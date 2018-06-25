import { action } from 'typesafe-actions'

export const nav = {
  home: () => action('navigateTo', { path: 'home' }),
  accounts: () => action('navigateTo', { path: 'accounts' }),
  budgets: () => action('navigateTo', { path: 'accounts' }),
}
