import { auth } from "@/src/core/firebase/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const googleProvider = new GoogleAuthProvider();

export function listenToAuthChanges(cb: (user: any) => void) {
  return onAuthStateChanged(auth, cb);
}

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signupWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logoutFirebase() {
  return signOut(auth);
}