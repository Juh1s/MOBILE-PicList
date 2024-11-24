import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZlAKf3ZXqZ6ILdlh4UNH6qwB8nO5mXQM",
  authDomain: "piclist-481d7.firebaseapp.com",
  databaseURL: "https//piclist-481d7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "piclist-481d7",
  storageBucket: "piclist-481d7.firebasestorage.app",
  messagingSenderId: "1032837411431",
  appId: "1:1032837411431:web:7b1b0dcb91c2f78385dac2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);