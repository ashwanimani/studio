import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
// import { getAuth, type Auth } from "firebase/auth";
// import { getStorage, type FirebaseStorage } from "firebase/storage";

// Firebase configuration sourced from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional: for Firebase Analytics
};

let app: FirebaseApp | undefined = undefined;
let db: Firestore | null = null;
// let auth: Auth | null = null;
// let storage: FirebaseStorage | null = null;

// Check if essential configuration variables are present
const essentialConfigPresent =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId;

if (essentialConfigPresent) {
  // Initialize Firebase only if it hasn't been initialized yet
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp(); // Use the existing app instance
  }
  // Initialize Firestore and other services if the app was successfully initialized
  db = getFirestore(app);
  // auth = getAuth(app); // Uncomment if you need Firebase Authentication
  // storage = getStorage(app); // Uncomment if you need Firebase Storage
} else {
  // Log a warning if essential Firebase config is missing.
  // This helps developers ensure their .env.local is set up correctly.
  console.warn(
    "Essential Firebase configuration (API Key, Auth Domain, Project ID) is missing. " +
    "Please set NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, and NEXT_PUBLIC_FIREBASE_PROJECT_ID " +
    "in your .env.local file. Firebase services will be disabled until configured."
  );
}

export { app, db /*, auth, storage */ };