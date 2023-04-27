import {db} from '../config/firebase.js';
import { ref, get, child } from "firebase/database";

// Function to read data from Firebase Realtime Database
async function readDataFromDb(path) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, path));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No data available');
    return null; // Return null if no data is available
  }
}

export { readDataFromDb };