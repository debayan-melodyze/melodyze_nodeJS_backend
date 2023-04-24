// readDb.js

const admin = require('firebase-admin');

// Function to read data from Firebase Realtime Database
async function readDataFromDb(path) {
  const db = admin.database();
  const ref = db.ref(path);
  const snapshot = await ref.once('value');
  return snapshot.val();
}

module.exports = {
  readDataFromDb
};
