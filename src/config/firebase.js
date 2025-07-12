// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATBgKYMREfohrBkFtctlm83wh7uFgySdE",
  authDomain: "shopdotco-4fdba.firebaseapp.com",
  projectId: "shopdotco-4fdba",
  storageBucket: "shopdotco-4fdba.firebasestorage.app",
  messagingSenderId: "116783834630",
  appId: "1:116783834630:web:5eb5504e260504cd8a8587",
  measurementId: "G-8HL57Y9E87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {analytics}