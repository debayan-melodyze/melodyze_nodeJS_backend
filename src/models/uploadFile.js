import { ref, uploadBytes } from 'firebase/storage';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { storage } from '../config/firebase.js';

// Function to write data to Firebase Storage
async function uploadDataToStorage(filePath, localPath) {
  const fileRef = ref(storage, filePath);
  const fileData = await readFile(resolve(localPath));

  await uploadBytes(fileRef, fileData);
  console.log('File uploaded successfully');
}

export { uploadDataToStorage };


