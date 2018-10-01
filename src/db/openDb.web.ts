import { createConnection } from './typeorm'
import { appEntities, indexEntities } from './dbEntities'

(window as any).SQL = require('sql.js')

export const openDb = async (app: boolean, name: string, key: string) => {
  const type = 'sqljs'
  const entities = app ? appEntities : indexEntities
  const db = await createConnection({
    type,
    name: name + '.db',
    synchronize: true,
    entities,
    extra: {
      key,
    }
    // logging: true,
  })
  return db
}

export const deleteDb = async (name: string) => {
  console.log('deleteDb', name)
  localStorage.removeItem(name + '.db')
}
