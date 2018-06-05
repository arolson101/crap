import { createConnection } from 'typeorm/browser'
import { appEntities, indexEntities } from './entities'

// if (process.env.NODE_ENV !== 'production') {
(window as any).SQL = require('sql.js/js/sql.js')
// }

export const openDb = async (app: boolean, name: string, password: string) => {
  const type = 'sqljs'
  const entities = app ? appEntities : indexEntities
  const db = await createConnection({
    type,
    name,
    location: name + '.db',
    synchronize: true,
    autoSave: true,
    entities,
    // logging: true,
  })
  return db
}
