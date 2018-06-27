export const paths = {
  login: '/login',
  app: '/app',

  root: {
    home: '/home',
    accounts: '/accounts',
    budgets: '/budgets'
  },

  account: {
    view: '/account',
    create: '/accounts/create/:bankId?',
    update: '/accounts/update/:bankId/:accountId?'
  },

  modal: {
    accountCreate: '/accountCreate',
  },

  dbAdvanced: '/db/:dbName',
}

export const nav = {
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
