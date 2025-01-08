// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, FieldValue, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNCbN4CSplpOwhK0AWLycrZoDPJ5cMhro",
  authDomain: "tender-app-88a9b.firebaseapp.com",
  projectId: "tender-app-88a9b",
  storageBucket: "tender-app-88a9b.appspot.com",
  messagingSenderId: "160045064658",
  appId: "1:160045064658:web:294ab76520c33beb02280b",
  measurementId: "G-DG8KW55QR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = new FieldValue(serverTimestamp);

export {projectStorage, projectFirestore, timestamp};
