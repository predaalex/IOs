// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCajM9YfO0A5xf3wCz3zHSFj-Vy80djE4w",
  authDomain: "drink-app-e080f.firebaseapp.com",
  projectId: "drink-app-e080f",
  storageBucket: "drink-app-e080f.appspot.com",
  messagingSenderId: "624694679100",
  appId: "1:624694679100:web:2e5bf11c328972b9f99539",
  measurementId: "G-8QJ13FBQSX"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };