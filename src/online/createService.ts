import axios, { CancelToken } from 'axios'
import { FinancialInstitutionImpl, BaseFinancialInstitutionData, OFXV1Connection, FinancialInstitutionAccount, HeadersObject, OFXApplicationContextHolder, DefaultApplicationContext, AccountType, BankAccountDetails, CreditCardAccountDetails } from 'ofx4js'
import { Bank, Account } from '../db/entities/index'
import { defineMessages, intl } from 'src/intl'

const messages = defineMessages({
  noFid: {
    id: 'createService.nofid',
    defaultMessage: "'fid' is not set"
  },
  noOrg: {
    id: 'createService.noorg',
    defaultMessage: "'org' is not set"
  },
  noOfx: {
    id: 'createService.noofx',
    defaultMessage: "'ofx' is not set"
  },
  noName: {
    id: 'createService.noname',
    defaultMessage: "'name' is not set"
  },
  noUsername: {
    id: 'createService.nousername',
    defaultMessage: "'username' is not set"
  },
  noPassword: {
    id: 'createService.nopassword',
    defaultMessage: "'password' is not set"
  },
  noAccountNumber: {
    id: 'createService.noAccountNumber',
    defaultMessage: "'accountNumber' is not set"
  },
  noRoutingNumber: {
    id: 'createService.noRoutingNumber',
    defaultMessage: "'routingNumber' is not set"
  }
})

const ajaxHandler = (cancelToken: CancelToken) => (
  async (url: string, verb: string, headers: HeadersObject, data: string, async: boolean): Promise<string> => {
    const res = await axios(url, {
      method: verb.toLowerCase(),
      headers,
      data,
      cancelToken,
    })
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    console.assert(typeof res.data === 'string')
    console.log({ url, verb, data, result: res.data })
    return res.data
  }
)

export const createService = (bank: Bank, cancelToken: CancelToken): FinancialInstitutionImpl => {
  OFXApplicationContextHolder.setCurrentContext(new DefaultApplicationContext('QWIN', '2300'))

  const { fid, org, ofx, name } = bank
  if (!fid) { throw new Error(intl.formatMessage(messages.noFid)) }
  if (!org) { throw new Error(intl.formatMessage(messages.noOrg)) }
  if (!ofx) { throw new Error(intl.formatMessage(messages.noOfx)) }
  if (!name) { throw new Error(intl.formatMessage(messages.noName)) }

  let fiData = new BaseFinancialInstitutionData()
  fiData.setFinancialInstitutionId(fid)
  fiData.setOrganization(org)
  fiData.setOFXURL(ofx)
  fiData.setName(name)

  let connection = new OFXV1Connection()
  connection.setAjax(ajaxHandler(cancelToken))

  // NOTE: making an OFX connection will fail security checks in browsers.  On Chrome you
  // can make it run with the "--disable-web-security" command-line option
  // e.g. (OSX): open /Applications/Google\ Chrome.app --args --disable-web-security
  const service = new FinancialInstitutionImpl(fiData, connection)
  return service
}

interface Login {
  username: string
  password: string
}

export const checkLogin = (bank: Bank): Login => {
  const { username, password } = bank
  if (!username) { throw new Error(intl.formatMessage(messages.noUsername)) }
  if (!password) { throw new Error(intl.formatMessage(messages.noPassword)) }
  return { username, password }
}

export const toAccountType = (acctType: AccountType): Account.Type => {
  let str = AccountType[acctType]
  if (!(str in Account.Type)) {
    console.warn(`unknown account type: {str}`)
    str = Account.Type.CHECKING
  }
  return str as Account.Type
}

export const fromAccountType = (str: Account.Type): AccountType => {
  if (!(str in AccountType)) {
    console.warn(`unknown account type: {str}`)
    str = Account.Type.CHECKING
  }
  return (AccountType as any)[str]
}

export const getFinancialAccount = (service: FinancialInstitutionImpl,
  bank: Bank,
  account: Account): FinancialInstitutionAccount => {
  const { username, password } = checkLogin(bank)
  const accountNumber = account.number
  if (!accountNumber) { throw new Error(intl.formatMessage(messages.noAccountNumber)) }
  let accountDetails

  switch (account.type) {
    case Account.Type.CHECKING:
    case Account.Type.SAVINGS:
    case Account.Type.CREDITLINE:
      const { routing } = account
      if (!routing) { throw new Error(intl.formatMessage(messages.noRoutingNumber)) }
      accountDetails = new BankAccountDetails()
      accountDetails.setAccountNumber(accountNumber)
      accountDetails.setRoutingNumber(routing)
      accountDetails.setAccountType(fromAccountType(account.type))
      return service.loadBankAccount(accountDetails, username, password)

    case Account.Type.CREDITCARD:
      accountDetails = new CreditCardAccountDetails()
      accountDetails.setAccountNumber(accountNumber)
      accountDetails.setAccountKey(account.key)
      return service.loadCreditCardAccount(accountDetails, username, password)

    default:
      throw new Error('unknown account type')
  }
}
