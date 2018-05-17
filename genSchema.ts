import * as fs from 'fs'
import { graphqlSync, getIntrospectionQuery } from 'graphql'
import schema from './src/db/schema'

const result = graphqlSync(schema, getIntrospectionQuery({ descriptions: true }))

fs.writeFileSync('./temp/schema.json', JSON.stringify(result, null, '  '))
