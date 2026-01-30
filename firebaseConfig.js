import { initializeApp, getApps, getApp} from 'firebase/app';
import { Platform } from 'react-native';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfUKgJ9JAQOjXVAnBv1UIizu2kr61Z0eQ",
  authDomain: "cspa1-b59ba.firebaseapp.com",
  projectId: "cspa1-b59ba",
  storageBucket: "cspa1-b59ba.firebasestorage.app",
  messagingSenderId: "231505652359",
  appId: "1:231505652359:web:1b728cacb00bfd28932622",
  measurementId: "G-CB7W54DQ4Q"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const database = getFirestore(app);

const persistence = Platform.OS === 'web' 
  ? browserLocalPersistence 
  : getReactNativePersistence(ReactNativeAsyncStorage);

export const auth = initializeAuth(app, { persistence })
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase