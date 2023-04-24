// firebase.js

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// const firebase = require('firebase/app');
// require('firebase/storage');
// require('firebase/database');

const firebaseConfig = {
  apiKey: 'AIzaSyDZNEuHznNzJTobl4xzeGUibuUcVFpZUjg',
  authDomain: 'melodyze-55267.firebaseapp.com',
  databaseURL: 'https://melodyze-test-default-rtdb.firebaseio.com',
  projectId: 'melodyze-test',
  storageBucket: 'melodyze-test.appspot.com'
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage().ref();
const database = firebase.database().ref();

module.exports = {
  storage,
  database
};
