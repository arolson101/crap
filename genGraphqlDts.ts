import * as process from 'process'
import * as fs from 'fs'
import * as path from 'path'

for (const file of process.argv) {
  if (path.extname(file) === '.graphql') {
    console.log(file)
    const lines = fs.readFileSync(file).toString().split('\n')
    let dts =
`import { ExecutableDocumentNode, MutationFcn } from '../graphql-types';
import * as T from './${path.basename(file, path.extname(file))}-types';

`
    for (const line of lines) {
      const match = line.match(/^\s*(query|mutation)\s+(\w+)/)
      if (match) {
        const type = match[1]
        const name = match[2]
        const variables = `T.${name}.Variables`
        const returns = `T.${name}.${type === 'query' ? 'Query' : 'Mutation'}`
        dts += `export const ${name}: ExecutableDocumentNode<${variables}, ${returns}>\n`
        if (type === 'query') {
          dts += `export type ${name} = ${returns}\n`
        } else {
          dts += `export type ${name} = MutationFcn<${variables}, ${returns}>\n`
        }
        dts += `\n`
      }
    }
    fs.writeFileSync(`${file}.d.ts`, dts)
  }
}
