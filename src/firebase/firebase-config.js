// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA15zUTkRR6mcu6dOLPlqr0GL6OCnwMM2w',
  authDomain: 'capture-rings.firebaseapp.com',
  projectId: 'capture-rings',
  storageBucket: 'capture-rings.appspot.com',
  messagingSenderId: '416116554711',
  appId: '1:416116554711:web:08cf5c9edac466cd626992',
  measurementId: 'G-M6J10XDFEC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
