import * as React from 'react'
import { Bank } from '../db'
import { BankForm } from '../forms/BankForm'
import { ctx } from '../App'

interface Params {
  bankId: string
}

interface Props {
  bank: Bank
}

export const BankUpdatePage: React.SFC<Props> = ({ bank, children }, context: ctx.Router<Params>) => {
  const { bankId } = context.router.route.match.params
  return (
    <BankForm bankId={bankId}>
      {children}
    </BankForm>
  )
}
BankUpdatePage.contextTypes = ctx.router
