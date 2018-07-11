(global as any).window = {}
require.extensions['.web.ts'] = require.extensions['.ts']
require.extensions['.web.tsx'] = require.extensions['.tsx']
import * as fs from 'fs'
import { graphqlSync, getIntrospectionQuery, buildClientSchema, buildSchema, printSchema } from 'graphql'
import schema from './src/db/schema'

const result = graphqlSync(schema, getIntrospectionQuery({ descriptions: true }))
fs.writeFileSync('./temp/schema.json', JSON.stringify(result, null, '  '))
