import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateSo')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateSo', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jateSo', 'readwrite');
  const store = tx.objectStore('jateSo');
  const request = store.put({ content, id:1 });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => { 
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jateSo', 'readonly');
  const store = tx.objectStore('jateSo');
  const request = store.get(1);
  const result = await request;
 
  return result?.content;
};

initdb();