// readController.js

const { readDataFromFile } = require('../models/readFile');
const { readDataFromDb } = require('../db/readDb');

// Function to read data from Firebase Storage and Firebase Realtime Database
async function readData(req, res) {
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

module.exports = {
  readData
};
