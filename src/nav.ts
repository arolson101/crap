export const paths = {
  root: {
    home: '/home',
    accounts: '/accounts',
    budgets: '/budgets'
  },

  account: {
    create: '/accounts/create/:bankId?',
    view: '/accounts/:bankId/:accountId',
    update: '/accounts/update/:bankId/:accountId?'
  },

  dbAdvanced: '/db/:dbName'
}

export const nav = {
  home: () => paths.root.home,
  budgets: () => paths.root.budgets,
  accounts: () => paths.root.accounts,
  bankCreate: () =>
    paths.account.create.replace(':bankId?', ''),
  bankUpdate: (bankId: string) =>
    paths.account.update.replace(':bankId', bankId).replace(':accountId?', ''),
  accountCreate: (bankId: string) =>
    paths.account.create.replace(':bankId?', bankId),
  accountView: (bankId: string, accountId: string) =>
    paths.account.view.replace(':bankId', bankId).replace(':accountId', accountId),
  accountUpdate: (bankId: string, accountId: string) =>
    paths.account.update.replace(':bankId', bankId).replace(':accountId?', accountId)
}
