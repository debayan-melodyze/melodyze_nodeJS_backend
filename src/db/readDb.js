import {db} from '../config/firebase.js';
import { ref, get, query, child, orderByChild, equalTo } from "firebase/database";

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

async function readDataFromDbWholeTable(table) {
  const dbRef = ref(db);
  const tableRef = child(dbRef, table);
  const snapshot = await get(tableRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No data available');
    return null; // Return null if no data is available
  }
}


async function readDataFromDbSpecificQuery(table, key, value) { 
  const dbRef = ref(db);
  const tableRef = child(dbRef, table);

  const queryConstraints = [orderByChild(key), equalTo(value)];
  // const queryRef = queryFn(tableRef, key, value);
  // const snapshot = await get(queryRef);

  const snapshot = await get(query(tableRef, ...queryConstraints));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No data available');
    return {}; // Return null if no data is available
  }
}

export { readDataFromDb, readDataFromDbWholeTable, readDataFromDbSpecificQuery};