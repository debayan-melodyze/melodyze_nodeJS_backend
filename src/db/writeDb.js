import { db } from '../config/firebase.js';
import { ref, set, child } from 'firebase/database';

// Function to write data to Firebase Realtime Database
async function writeDataToDb(path, data) {
  const dbRef = ref(db);
  await set(child(dbRef, path), data);
  console.log('Data successfully written to Firebase Realtime Database:'+path);
}

export { writeDataToDb };
