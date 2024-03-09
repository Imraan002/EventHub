import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Fill in your Firebase config here
  apiKey: "AIzaSyDhb6bEFxpUVp4r2WsTPmSK6pR2toCqedA",
  authDomain: "eventhub-2d326.firebaseapp.com",
  projectId: "eventhub-2d326",
  storageBucket: "eventhub-2d326.appspot.com",
  messagingSenderId: "364699289060",
  appId: "1:364699289060:web:edaba5c94fbb0e804033f1",
  measurementId: "G-BR44H7GZQ6"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Commented out because it's not used

export default app;
