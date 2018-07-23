import SqlitePlugin from 'react-native-sqlcipher-storage'
import { appEntities, indexEntities } from './entities'
import { createConnection } from './typeorm'

// tslint:disable-next-line:variable-name
const trigger_on_insert_transaction = `
DROP TRIGGER IF EXISTS trigger_on_insert_transaction;
CREATE TRIGGER trigger_on_insert_transaction BEFORE INSERT ON 'transactions'
  BEGIN
    UPDATE 'transactions' SET balance = balance + NEW.balance WHERE time >= NEW.time;
  END;
`

// tslint:disable-next-line:variable-name
const trigger_on_update_transaction = `
DROP TRIGGER IF EXISTS trigger_on_update_transaction;
CREATE TRIGGER trigger_on_update_transaction BEFORE UPDATE ON 'transactions'
  BEGIN
    UPDATE 'transactions' SET balance = balance - OLD.balance WHERE time >= OLD.TIME;
    UPDATE 'transactions' SET balance = balance + NEW.balance WHERE time >= NEW.time;
  END;
`

// tslint:disable-next-line:variable-name
const trigger_on_delete_transaction = `
DROP TRIGGER IF EXISTS trigger_on_delete_transaction;
CREATE TRIGGER trigger_on_delete_transaction BEFORE DELETE ON 'transactions'
  BEGIN
    UPDATE 'transactions' SET balance = balance - OLD.balance WHERE time >= OLD.TIME;
  END;
`

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
    // logging: true,
  })
  if (app) {
    await db.query(trigger_on_insert_transaction)
    await db.query(trigger_on_update_transaction)
    await db.query(trigger_on_delete_transaction)
  }
  return db
}

export const deleteDb = async (name: string) => {
  if (SqlitePlugin) {
    await SqlitePlugin.deleteDatabase({
      name: dbName(name),
      location: iosDatabaseLocation,
    })
  }
}
