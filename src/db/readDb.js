import {db} from '../config/firebase.js';
import { ref, get, child } from "firebase/database";

// Function to read data from Firebase Realtime Database
async function readDataFromDb(path) {
  const dbRef = ref(db);
  get(child(dbRef, path)).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  // const snapshot = await dbref.once('value');
  
}

export { readDataFromDb };