import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { AppRegistry, Platform } from 'react-native'
import Root from './App/Root'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'normalize.css/normalize.css'

AppRegistry.registerComponent('App', () => Root)

const runApp = () => {
  AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })
}

runApp()

const registerServiceWorker = require('./registerServiceWorker').default
registerServiceWorker()

// if (module.hot) {
//   module.hot.accept('./App/Root', () => {
//     runApp()
//   })
// }

import { createConnection, Entity, Column, PrimaryGeneratedColumn, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'

async function testTypeORM () {
  const db = await createConnection({
    type: 'sqljs',
    // database: 'test',
    location: 'test',
    entities: [
      // User
    ],
    // logging: true,
    // dropSchema: true,
    synchronize: true
  })

  // const count = await db.manager.count(User)
  // console.log(`${count} users in table`)

  // if (count === 0) {
  //   console.time('creating')
  //   for (let bank of ['bank1', 'bank2', 'bank3']) {
  //     const records: User[] = []
  //     for (let i = 0; i <= 10000; i++) {
  //       const user = new User();
  //       user._id = `transaction/${bank}/${i}`
  //       user.bank = bank
  //       user.date = Date.now() - i
  //       records.push(user)

  //       if (records.length >= 500) {
  //         const msg = `putting ${i - records.length} - ${i}`
  //         console.time(msg)
  //         await db.transaction(async mgr => {
  //           await mgr.save(records)
  //         })
  //         console.timeEnd(msg)
  //         records.length = 0
  //       }
  //     }
  //   }
  //   console.timeEnd('creating')
  // }

  // (db as any).databaseDriver
}

// testTypeORM()

// import * as localforage from 'localforage'

// interface User {
//   _id: string
//   bank: string
//   date: number
// }

// async function testLocalForage () {
//   let db = localforage.createInstance({name: 'test'})
//   let count = 0
//   if (count === 0) {
//     console.time('creating')
//     for (let bank of ['bank1', 'bank2', 'bank3']) {
//       const records: User[] = []
//       for (let i = 0; i <= 50000; i++) {
//         const user: User = {
//           _id: `transaction/${bank}/${i}`,
//           bank: bank,
//           date: Date.now() - i,
//         }
//         await db.setItem(user._id, user)
//         // db[user._id] = user
//         // records.push(user)

//         // if (records.length >= 500) {
//         //   const msg = `putting ${i - records.length} - ${i}`
//         //   // console.time(msg)
//         //   db = records.reduce(
//         //     (d, record) => d[record._id] = record,
//         //     {}
//         //   )
//         //   // console.timeEnd(msg)
//         //   records.length = 0
//         // }
//       }
//     }
//     console.time('stringify')
//     const count = Object.keys(db).length
//     console.log(`${count} objects`)
//     const str = JSON.stringify(db)
//     console.timeEnd('stringify')
//     console.timeEnd('creating')
//   }

//   // (db as any).databaseDriver
// }

// testLocalForage()
