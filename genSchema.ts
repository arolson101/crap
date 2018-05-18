import * as fs from 'fs'
import { graphqlSync, getIntrospectionQuery, buildClientSchema, buildSchema, printSchema } from 'graphql'
import schema from './src/db/schema'

// const fixedSchema = printSchema(schema)
//   .replace(/\[(\w+)\]\!/g, '[$1!]!') // make array elements non-nullable.  E.g. [String]! -> [String!]!

// const newSchema = buildSchema(fixedSchema)

const result = graphqlSync(schema, getIntrospectionQuery({ descriptions: true }))
fs.writeFileSync('./temp/schema.json', JSON.stringify(result, null, '  '))
