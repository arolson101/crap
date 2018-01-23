import Dexie from 'dexie';

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
      contacts: '++id, first, last',
    });
  }
}

export const test = async () => {
  try {
    await Dexie.delete('myDb');
    const db = new MyAppDatabase('myDb');
    const contact: Contact = {
      first: 'first',
      last: 'last'
    };
    await db.open();
    await db.transaction('rw', db.contacts, async () => {
      contact.id = await db.contacts.put(contact);
    });
    // console.log(contact);
  } catch (err) {
    // console.error(err);
    throw err;
  }
};
