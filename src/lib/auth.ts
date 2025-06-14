
// This is an autogenerated file from Firebase Studio.
'use server'; // Potentially, some functions might be used in Server Actions if needed, but primarily for client.

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase'; // auth and db are initialized Firebase services

// Import operations and types from the new firebase-auth-operations.ts file
import {
  opCreateUserWithEmailAndPassword,
  opSignInWithEmailAndPassword,
  opSignOut,
  opUpdateProfile,
  type UserCredential,
  type FirebaseUser,
} from './firebase-auth-operations';


export interface UserProfile {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  displayName: string | null;
  createdAt: any; // Firebase ServerTimestamp
}

/**
 * Signs up a new user with email and password, and stores their profile in Firestore.
 */
export async function signUpWithEmailPassword(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<FirebaseUser> {
  if (!auth || !db) {
    throw new Error('Firebase has not been initialized correctly.');
  }

  try {
    const userCredential: UserCredential = await opCreateUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await opUpdateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    // Create user document in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userProfileData: UserProfile = {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName,
      displayName: user.displayName,
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, userProfileData);

    return user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    // It's good to check if the error has a message property
    const errorMessage = error instanceof Error ? error.message : 'Failed to sign up.';
    throw new Error(errorMessage);
  }
}

/**
 * Signs in an existing user with email and password.
 */
export async function signInWithEmailPassword(email: string, password: string): Promise<FirebaseUser> {
  if (!auth) {
    throw new Error('Firebase Auth has not been initialized correctly.');
  }
  try {
    const userCredential: UserCredential = await opSignInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to sign in.';
    throw new Error(errorMessage);
  }
}

/**
 * Signs out the current user.
 */
export async function signOutUser(): Promise<void> {
  if (!auth) {
    throw new Error('Firebase Auth has not been initialized correctly.');
  }
  try {
    await opSignOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to sign out.';
    throw new Error(errorMessage);
  }
}
