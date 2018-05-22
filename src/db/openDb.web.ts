import { createConnection } from 'typeorm/browser'
import { entities } from './entities'

// if (process.env.NODE_ENV !== 'production') {
(window as any).SQL = require('sql.js/js/sql.js')
// }

export const openDb = async (name: string, password: string) => {
  const type = 'sqljs'
  const db = await createConnection({
    type,
    location: name + '.db',
    synchronize: true,
    autoSave: true,
    entities,
    // logging: true,
  })
  return db
}
