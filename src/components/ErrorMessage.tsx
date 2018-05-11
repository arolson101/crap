import * as React from 'react'
import { ErrorText } from './text'

interface Props {
  error: Error | undefined
}

export const ErrorMessage: React.SFC<Props> = ({ error }) => {
  if (error) {
    return <ErrorText>{error.message}</ErrorText>
  } else {
    return null
  }
}
