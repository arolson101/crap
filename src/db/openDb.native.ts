import { createConnection } from 'typeorm/browser'

export const openDb = async (entities: Function[], name: string, password: string) => {
  const db = await createConnection({
    type: 'react-native',
    database: name + '.db',
    synchronize: true,
    location: 'Documents', // https://github.com/andpor/react-native-sqlite-storage#opening-a-database
    entities,
  })
  return db
}
