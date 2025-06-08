
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
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

// Detailed logging for debugging environment variable loading
console.log("Attempting to load Firebase config from environment variables:");
console.log("NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Loaded" : "MISSING or UNDEFINED");
console.log("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Loaded" : "MISSING or UNDEFINED");
console.log("NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Loaded" : "MISSING or UNDEFINED");
console.log("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "Loaded" : "MISSING or UNDEFINED");
console.log("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "Loaded" : "MISSING or UNDEFINED");
console.log("NEXT_PUBLIC_FIREBASE_APP_ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "Loaded" : "MISSING or UNDEFINED");


let app: FirebaseApp | undefined = undefined;
let db: Firestore | null = null;
let auth: Auth | null = null;
// let storage: FirebaseStorage | null = null;

// Check if essential configuration variables are present
const essentialConfigPresent =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId;

if (essentialConfigPresent) {
  console.log("Essential Firebase config (API Key, Auth Domain, Project ID) detected. Initializing Firebase...");
  // Initialize Firebase only if it hasn't been initialized yet
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase app initialized successfully.");
  } else {
    app = getApp(); // Use the existing app instance
    console.log("Using existing Firebase app instance.");
  }
  // Initialize Firestore and other services if the app was successfully initialized
  db = getFirestore(app);
  auth = getAuth(app); // Firebase Authentication is now initialized
  // storage = getStorage(app); // Uncomment if you need Firebase Storage
  console.log("Firestore and Auth services initialized.");
} else {
  // Log a warning if essential Firebase config is missing.
  console.warn(
    "CRITICAL ERROR: Essential Firebase configuration (API Key, Auth Domain, Project ID) is MISSING. " +
    "Firebase services will NOT be initialized. Please ensure these environment variables are correctly set: " +
    "NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID."
  );
}

export { app, db, auth /*, storage */ };
