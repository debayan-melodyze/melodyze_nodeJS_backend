const firebase = require('../config/firebase').default;

const writeFile = async (filePath, buffer) => {
  try {
    await firebase.admin.storage().bucket().file(filePath).save(buffer);
  } catch (err) {
    console.error(err);
    throw new Error('Error uploading file to Firebase storage');
  }
};

module.exports = { writeFile };
