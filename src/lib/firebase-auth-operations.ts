// This file is NOT 'use server' and contains direct Firebase Authentication operations.
// It's created to potentially help with module resolution issues when 'firebase/auth'
// is imported from a 'use server' module in some build configurations (e.g., with Turbopack).

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSdkSignOut, // Renamed to avoid potential global conflicts
  updateProfile,
  type Auth as FirebaseAuthInstanceType,
  type UserCredential as FirebaseAuthUserCredential,
  type User as FirebaseUserType,
} from 'firebase/auth';

// Export types that might be needed by other modules (e.g., auth.ts)
export type UserCredential = FirebaseAuthUserCredential;
export type FirebaseUser = FirebaseUserType;
export type FirebaseAuthInstance = FirebaseAuthInstanceType;

// Wrapper functions that take an auth instance and perform Firebase Auth operations

export function opCreateUserWithEmailAndPassword(authInstance: FirebaseAuthInstance, email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

export function opSignInWithEmailAndPassword(authInstance: FirebaseAuthInstance, email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(authInstance, email, password);
}

export function opSignOut(authInstance: FirebaseAuthInstance): Promise<void> {
  return firebaseSdkSignOut(authInstance);
}

export function opUpdateProfile(user: FirebaseUser, profile: { displayName?: string | null; photoURL?: string | null; }): Promise<void> {
  return updateProfile(user, profile);
}
