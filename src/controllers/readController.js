import { readDataFromFile } from '../models/readFile.js';
import { readDataFromDb } from '../db/readDb.js';

// Function to read data from Firebase Storage and Firebase Realtime Database
async function readData(res) {
  try {
    const fileData = await readDataFromFile('path/to/file');
    const dbData = await readDataFromDb('path/to/database');
    const response = {
      fileData,
      dbData
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { readData };

