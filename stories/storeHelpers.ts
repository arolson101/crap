import { FI, filist, formatAddress } from '../src/fi'
import { DbDependencies } from '../src/db'
import { Bank, Account } from '../src/db/resolvers'

/**
 * Warning from React Router, caused by react-hot-loader.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */
if (module.hot) {
  const isString = (x: any) => typeof x === 'string'

  const orgError = console.error // eslint-disable-line no-console
  console.error = (...args: any[]) => { // eslint-disable-line no-console
    if (args && args.length === 1 && isString(args[0]) && args[0].indexOf('You cannot change <Router history>') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args)
    }
  }
}

export const dependencies: DbDependencies = {
  getTime: Date.now,
  genId: () => Date.now().toString(),
  openDb: async () => { throw new Error(`can't open databases in storybook`) },
}

export const initialDbs = (dbs: string[], openError: Error | undefined = undefined) => ({
  db: {
    dbs,
    isOpening: false,
    openError,
  }
})

export const openedDb = () => ({
  db: {
    db: {} as any,
    dbs: [],
    isOpening: false,
  }
})

const dummyAccount = (id: string, name: string, type: Account.Type): Account => ({
  id: id,
  _deleted: 0,
  name,
  color: 'red',
  type,
  number: id,
  visible: true,
  bankId: '',
  routing: '',
  key: '',
})

const dummyBank = (fi: FI, accounts: Account[]): Bank => ({
  id: `bnk${fi.id}`,
  _deleted: 0,

  name: fi.name,
  web: fi.profile.siteURL,
  address: formatAddress(fi),
  notes: `notes for bank ${fi.name}\nmore notes`,
  favicon: '',

  online: true,

  fid: fi.fid,
  org: fi.org,
  ofx: fi.ofx,

  username: `user${fi.id}`,
  password: `pass${fi.id}`,
})

const types: Account.Type[] = [
  Account.Type.CHECKING,
  Account.Type.SAVINGS,
  Account.Type.CREDITCARD,
]

const dummyBankAndAccounts = (fi: FI, numAccounts: number, type?: Account.Type) => {
  const accounts = Array.from(Array(numAccounts)).map(
    (x, idx) => dummyAccount(
      `00${fi.id}00${idx}`,
      `${fi.name} ${type ? type : types[idx % types.length]}`,
      type ? type : types[idx % types.length]
    )
  )

  const bank = dummyBank(fi, accounts)
  return { bank, accounts }
}

export const withDummyDataMin = () => {
  const accounts: Account[] = []
  const banks: Bank[] = [];
  [
    dummyBankAndAccounts(filist[2], 1),
    dummyBankAndAccounts(filist[500], 1, Account.Type.CREDITCARD),
  ].forEach(a => {
    accounts.push(...a.accounts)
    banks.push(a.bank)
  })

  return {
    ...openedDb(),
  }
}

export const withDummyDataMed = () => {
  const accounts: Account[] = []
  const banks: Bank[] = [];
  [
    dummyBankAndAccounts(filist[2], 3),
    dummyBankAndAccounts(filist[500], 1, Account.Type.CREDITCARD),
    dummyBankAndAccounts(filist[750], 1, Account.Type.CREDITCARD),
  ].forEach(a => {
    accounts.push(...a.accounts)
    banks.push(a.bank)
  })

  return {
    ...openedDb(),
  }
}

export const withDummyDataMax = () => {
  const accounts: Account[] = []
  const banks: Bank[] = []
  Array.from(Array(10))
  .map((x, idx) => dummyBankAndAccounts(filist[2 + idx * 75], 5))
  .forEach(a => {
    accounts.push(...a.accounts)
    banks.push(a.bank)
  })

  return {
    ...openedDb(),
  }
}
