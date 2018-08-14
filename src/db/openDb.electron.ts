import * as electron from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { appEntities, indexEntities } from './dbEntities'
import { createConnection } from './typeorm'

const userData = electron.remote.app.getPath('userData')

export const openDb = async (app: boolean, name: string, key: string) => {
  const type = 'sqlite'
  const entities = app ? appEntities : indexEntities
  const db = await createConnection({
    type,
    name,
    database: path.join(userData, name + '.db'),
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
  const database = path.join(userData, name + '.db')
  fs.unlinkSync(database)
}
