import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBlC1UgdewNOS_0pwfyWFZwvSzo6mg6Jfo",
  authDomain: "piclist-5f835.firebaseapp.com",
  databaseURL: "https://piclist-5f835-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "piclist-5f835",
  storageBucket: "piclist-5f835.firebasestorage.app",
  messagingSenderId: "476592060213",
  appId: "1:476592060213:web:07f2c676ec7742f8e93e7c",
  measurementId: "G-PC49RLLWEC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);