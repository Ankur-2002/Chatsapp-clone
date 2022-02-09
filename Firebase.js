// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYfZIWlGu5gzqCrzLbnX2HZ2cNIB0hVis',
  authDomain: 'whatsapp-ea334.firebaseapp.com',
  projectId: 'whatsapp-ea334',
  storageBucket: 'whatsapp-ea334.appspot.com',
  messagingSenderId: '693986062075',
  appId: '1:693986062075:web:fe40e912dfb56e01a44a5e',
};

// Initialize Firebase
// const app  = !firebase.app.length
// const app = !firebase.getApp().name
let app;
if (!firebase.getApps().length) app = firebase.initializeApp(firebaseConfig);
else firebase.getApps()[0];
// : firebase.getApp('whatsapp-ea334');

//   : firebase.app();
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
// export { app, auth, provider };
