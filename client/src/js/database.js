import { openDB } from 'idb';

const initdb = async () =>
// Creating new database named 'jate'
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creating a new object store with key name of 'id'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  console.error('putDb not implemented');

  // Connect to the database
  const jateDb = await openDB('jate', 1);

  // Create new transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open object store and use .add() to pass in content
  const store = tx.objectStore('jate');
  const request = store.add({ content });

  // Request confirmation
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  console.error('getDb not implemented');

  // Connect to the database
  const jateDb = await openDB('jate', 1);

  // Create new transaction
  const tx = jateDb.transaction('jate', 'readonly');

  // Open object store and use .getAll() method to get all data in the database
  const store = tx.objectStore('jate');
  const request = store.getAll();

  // Request confirmation
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
