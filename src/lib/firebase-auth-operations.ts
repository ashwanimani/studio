
// This file is NOT 'use server' and contains direct Firebase Authentication operations.
// It's created to potentially help with module resolution issues when 'firebase/auth'
// is imported from a 'use server' module in some build configurations (e.g., with Turbopack).

// Import the re-exported functions and types from './firebase'
import {
  firebaseOpCreateUserWithEmailAndPassword,
  firebaseOpSignInWithEmailAndPassword,
  firebaseOpSignOut,
  firebaseOpUpdateProfile,
  type FirebaseAuthInstanceExportType,
  type FirebaseUserCredentialType,
  type FirebaseUserType as FirebaseUserInternalType,
} from './firebase';

// Export types that might be needed by other modules (e.g., auth.ts)
export type UserCredential = FirebaseUserCredentialType;
export type FirebaseUser = FirebaseUserInternalType;
export type FirebaseAuthInstance = FirebaseAuthInstanceExportType;

// Wrapper functions now use the imported internal functions from ./firebase
export function opCreateUserWithEmailAndPassword(authInstance: FirebaseAuthInstance, email: string, password: string): Promise<UserCredential> {
  return firebaseOpCreateUserWithEmailAndPassword(authInstance, email, password);
}

export function opSignInWithEmailAndPassword(authInstance: FirebaseAuthInstance, email: string, password: string): Promise<UserCredential> {
  return firebaseOpSignInWithEmailAndPassword(authInstance, email, password);
}

export function opSignOut(authInstance: FirebaseAuthInstance): Promise<void> {
  return firebaseOpSignOut(authInstance);
}

export function opUpdateProfile(user: FirebaseUser, profile: { displayName?: string | null; photoURL?: string | null; }): Promise<void> {
  return firebaseOpUpdateProfile(user, profile);
}
