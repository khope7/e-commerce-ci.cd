// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Pulling firebase api pull information from seperate env folder for security
const firebaseConfig = {
apiKey: process.env.VITE_APP_API_KEY,
authDomain: process.env.VITE_APP_AUTH_DOMAIN,
projectId: process.env.VITE_APP_PROJECT_ID,
storageBucket: process.env.VITE_APP_STORAGE_BUCKET,
messagingSenderId: process.env.VITE_APP_MESSAGING_SENDER_ID,
appId: process.env.VITE_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };