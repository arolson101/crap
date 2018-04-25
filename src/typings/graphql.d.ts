// graphql.d.ts file
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}

declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}
