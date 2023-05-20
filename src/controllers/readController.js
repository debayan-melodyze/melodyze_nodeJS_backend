import { downloadDataFromStorage } from '../storage/downloadFile.js';
import { readDataFromDb } from '../db/readDb.js';

// Function to read data from Firebase Storage and Firebase Realtime Database
async function readData(req, res) {
  try {
    await downloadDataFromStorage('Lyrics/song_1_My Heart Will Go On_100.json', './temp/sample.json');
    const dbData = await readDataFromDb('/Song_Master');
    console.log(dbData);
    const response = {
      dbData
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { readData };

