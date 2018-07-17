import * as process from 'process'
import * as fs from 'fs'
import * as path from 'path'

const header =
`import { DocumentNode } from 'graphql'

`

for (const file of process.argv) {
  if (path.extname(file) === '.graphql') {
    console.log(file)
    const lines = fs.readFileSync(file).toString().split('\n')
    let dts = header
    for (const line of lines) {
      const match = line.match(/^\s*(query|mutation)\s+(\w+)/)
      if (match) {
        const name = match[2]
        dts += `export const ${name}: DocumentNode\n`
      }
    }
    fs.writeFileSync(`${file}.d.ts`, dts)
  }
}
