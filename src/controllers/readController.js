import { readDataFromFile } from '../models/readFile.js';
import { readDataFromDb } from '../db/readDb.js';

// Function to read data from Firebase Storage and Firebase Realtime Database
async function readData(req, res) {
  try {
    // const fileData = await readDataFromFile('Lyrics/song_1_My Heart Will Go On_100.json');
    const dbData = await readDataFromDb('/Song_Master');
    const response = {
      // fileData,
      dbData
    };
    res.json(response);
    console.log(res)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { readData };

