import 'raf/polyfill';
import Dexie from 'dexie';

// console.log('using fake-indexeddb');
Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
