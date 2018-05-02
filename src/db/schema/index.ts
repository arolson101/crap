import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'
import { AppDatabase } from '../AppDatabase'
import typeDefs from './schema.graphql'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
