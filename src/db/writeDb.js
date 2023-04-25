import admin from 'firebase-admin';

// Function to write data to Firebase Realtime Database
async function writeDataToDb(path, data) {
  const db = admin.database();
  const ref = db.ref(path);
  await ref.set(data);
}

export { writeDataToDb };
