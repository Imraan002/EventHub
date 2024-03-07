
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhb6bEFxpUVp4r2WsTPmSK6pR2toCqedA",
  authDomain: "eventhub-2d326.firebaseapp.com",
  projectId: "eventhub-2d326",
  storageBucket: "eventhub-2d326.appspot.com",
  messagingSenderId: "364699289060",
  appId: "1:364699289060:web:edaba5c94fbb0e804033f1",
  measurementId: "G-BR44H7GZQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;