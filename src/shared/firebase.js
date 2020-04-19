import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCigoqWUWaTu0KOBgFJ63CsfxHJy9C_q-o",
  authDomain: "taskfull-b8522.firebaseapp.com",
  databaseURL: "https://taskfull-b8522.firebaseio.com",
  projectId: "taskfull-b8522",
  storageBucket: "taskfull-b8522.appspot.com",
  messagingSenderId: "422891538648",
  appId: "1:422891538648:web:7e9172beb01b51b0616fad"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
