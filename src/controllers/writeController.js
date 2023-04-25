import { writeFile } from '../models/writeFile.js';
import { writeDataToDb } from '../db/writeDb.js';

// Function to write data to Firebase Storage and Firebase Realtime Database
async function writeData(req, res) {
  try {
    const fileData = req.body.fileData;
    const dbData = req.body.dbData;
    await writeFile('path/to/file', fileData);
    await writeDataToDb('path/to/database', dbData);
    res.status(200).send('Data written successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { writeData };

