import { FormattedMessage } from 'react-intl'

export class IntlError extends Error {
  constructor(
    public intl: FormattedMessage.MessageDescriptor
  ) {
    super(intl.defaultMessage)
  }
}
