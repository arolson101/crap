import * as React from 'react'
import * as RI from 'react-intl'

const intlProvider = new RI.IntlProvider({ locale: 'en' }, {})
export let intl: ReactIntl.InjectedIntl = intlProvider.getChildContext().intl

export type MessageDescriptor = RI.FormattedMessage.MessageDescriptor

export const T: React.SFC<MessageDescriptor> = (props) => <>{intl.formatMessage(props)}</>

export const IntlProvider: React.SFC<any> = ({ children }) => <>{children}</>

export const defineMessages = RI.defineMessages
