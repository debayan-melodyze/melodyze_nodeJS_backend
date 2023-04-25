import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDZNEuHznNzJTobl4xzeGUibuUcVFpZUjg',
  authDomain: 'melodyze-55267.firebaseapp.com',
  databaseURL: 'https://melodyze-test-default-rtdb.firebaseio.com',
  projectId: 'melodyze-test',
  storageBucket: 'melodyze-test.appspot.com'
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export default {
  storage,
  database
};
