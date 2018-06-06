import { createConnection } from 'typeorm/browser'
import { appEntities, indexEntities } from './entities'
import SqlitePlugin from 'react-native-sqlcipher-storage'

const iosDatabaseLocation: SqlitePlugin.Location = 'Documents'

const dbName = (name: string) => {
  return name + '.db'
}

export const openDb = async (app: boolean, name: string, key: string) => {
  const entities = app ? appEntities : indexEntities
  const extra: SqlitePlugin.DatabaseOptionalParams = {
    key
  }
  const db = await createConnection({
    type: 'react-native',
    name,
    database: dbName(name),
    synchronize: true,
    location: iosDatabaseLocation, // https://github.com/andpor/react-native-sqlite-storage#opening-a-database
    entities,
    extra,
    logging: true,
  })
  return db
}

export const deleteDb = async (name: string) => {
  if (SqlitePlugin) {
    SqlitePlugin.deleteDatabase({
      name: dbName(name),
      location: iosDatabaseLocation,
    })
  }
}
