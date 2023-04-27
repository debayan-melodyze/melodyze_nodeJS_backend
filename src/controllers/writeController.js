import { uploadDataToStorage } from '../models/uploadFile.js';
import { writeDataToDb } from '../db/writeDb.js';

// Function to write data to Firebase Storage and Firebase Realtime Database
async function writeData(req, res) {
  try {
    const filePathLocal = req.body.filePathLocal;
    const dbTable = req.body.dbTable;
    const dbID = req.body.dbID;
    const dbData = req.body.dbData;
    await uploadDataToStorage('Lyrics/sample_nodejs_test.json', filePathLocal);
    await writeDataToDb('/'+dbTable+'/'+dbID, dbData);
    res.status(200).send('Data written successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { writeData };

