import { createConnection } from 'typeorm/browser'
import { appEntities, indexEntities } from './entities'

export const openDb = async (app: boolean, name: string, password: string) => {
  const entities = app ? appEntities : indexEntities
  const db = await createConnection({
    type: 'react-native',
    name,
    database: name + '.db',
    synchronize: true,
    location: 'Documents', // https://github.com/andpor/react-native-sqlite-storage#opening-a-database
    entities,
  })
  return db
}
