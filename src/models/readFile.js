import {storage} from '../config/firebase.js';


// Function to read data from Firebase Storage
async function readDataFromFile(filePath) {
  try {
    const fileRef = storage.ref(filePath);
    const fileUrl = await fileRef.getDownloadURL();
    const response = await fetch(fileUrl);
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Unable to read data from file: ${error.message}`);
  }
}

export { readDataFromFile };
