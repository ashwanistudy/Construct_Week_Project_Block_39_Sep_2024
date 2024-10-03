// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC3kBUXruxN8l--oFjIGTbx6h7po4tY3A",
  authDomain: "code-for-climate.firebaseapp.com",
  projectId: "code-for-climate",
  storageBucket: "code-for-climate.appspot.com",
  messagingSenderId: "310220180917",
  appId: "1:310220180917:web:feae7879c1d7f46e189dfc",
  measurementId: "G-JGCGT3FKW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);