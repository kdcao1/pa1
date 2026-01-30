import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  aapiKey: "AIzaSyBfUKgJ9JAQOjXVAnBv1UIizu2kr61Z0eQ",
  authDomain: "cspa1-b59ba.firebaseapp.com",
  databaseURL: 'https://cspa1.nam5.firebaseio.com',
  projectId: "cspa1-b59ba",
  storageBucket: "cspa1-b59ba.firebasestorage.app",
  messagingSenderId: "231505652359",
  appId: "1:231505652359:web:1b728cacb00bfd28932622",
  measurementId: "G-CB7W54DQ4Q"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
