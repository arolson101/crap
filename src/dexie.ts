import Dexie from 'dexie';
import 'dexie-observable';
import 'dexie-syncable';

Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

interface Contact {
  id?: string;
  first: string;
  last: string;
}

class MyAppDatabase extends Dexie {
  contacts: Dexie.Table<Contact, string>;

  constructor (name: string) {
      super(name);
      this.version(1).stores({
          contacts: '$$id, first, last',
      });
  }
}

export const test = async () => {
  const db = new MyAppDatabase('myDb');
  const contact: Contact = {
    first: 'first',
    last: 'last'
  };
  try {
    await db.transaction('rw', db.contacts, async () => {
      contact.id = await db.contacts.put(contact);
    });
  } catch (err) {
    console.error(err);
  }
  console.log(contact);
};
