(global as any).window = {}
import * as fs from 'fs'
import { graphqlSync, getIntrospectionQuery, buildClientSchema, buildSchema, printSchema } from 'graphql'
import schema from './src/db/schema'

const result = graphqlSync(schema, getIntrospectionQuery({ descriptions: true }))
fs.writeFileSync('./temp/schema.json', JSON.stringify(result, null, '  '))
