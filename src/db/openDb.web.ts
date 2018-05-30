import { createConnection } from 'typeorm/browser'

// if (process.env.NODE_ENV !== 'production') {
(window as any).SQL = require('sql.js/js/sql.js')
// }

export const openDb = async (entities: Function[], name: string, password: string) => {
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
