// writeController.js

const { writeDataToFile } = require('../models/writeFile');
const { writeDataToDb } = require('../db/writeDb');

// Function to write data to Firebase Storage and Firebase Realtime Database
async function writeData(req, res) {
  try {
    const fileData = req.body.fileData;
    const dbData = req.body.dbData;
    await writeDataToFile('path/to/file', fileData);
    await writeDataToDb('path/to/database', dbData);
    res.status(200).send('Data written successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  writeData
};
