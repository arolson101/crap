import { createConnection } from 'typeorm/browser'
import { appEntities, indexEntities } from './entities'

const iosDatabaseLocation = 'Documents'

export const openDb = async (app: boolean, name: string, password: string) => {
  const entities = app ? appEntities : indexEntities
  const db = await createConnection({
    type: 'react-native',
    name,
    database: name + '.db',
    synchronize: true,
    location: iosDatabaseLocation, // https://github.com/andpor/react-native-sqlite-storage#opening-a-database
    entities,
  })
  return db
}

export const deleteDb = async (name: string) => {
  // localStorage.removeItem(name + '.db')
  if ((window as any).sqlitePlugin) {
    (window as any).sqlitePlugin.deleteDatabase({
      name: name + '.db',
      iosDatabaseLocation,
    })
  }
}
