import { DocumentNode } from 'graphql'

export interface ExecutableDocumentNode<TVariables, TResults> extends DocumentNode {
  __variables?: TVariables
  __results?: TResults
}

type CompletionFcn<TRet> = (result: TRet) => any

export interface MutationFcnOptions<TRet> {
  noSpinner?: boolean
  cancel?: () => any
  complete?: CompletionFcn<TRet>
  finally?: () => any
}

export type MutationFcn<TVars, TRet> = (vars: TVars, options?: MutationFcnOptions<TRet>) => void
