import { storage } from '../config/firebase.js';
import https from 'https';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { ref, getDownloadURL } from 'firebase/storage';

// Function to read data from Firebase Storage
async function downloadDataFromStorage(filePath, localPath) {
  const fileRef = ref(storage, filePath);
  const localFile = createWriteStream(resolve(localPath));
  
  const downloadURL = await getDownloadURL(fileRef);

  https.get(downloadURL, (response) => {
    response.pipe(localFile);
  
    localFile.on('finish', () => {
      localFile.close();
      console.log('File downloaded successfully');
    });
  }).on('error', (error) => {
    console.error('Error downloading file:', error);
    fs.unlink(localPath, (unlinkError) => {
      if (unlinkError) throw unlinkError;
    });
  });

}

export { downloadDataFromStorage };
