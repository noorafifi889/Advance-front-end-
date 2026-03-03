import { auth, db } from "@/src/core/firebase/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

export async function saveUserProfile(uid: string, data: any) {
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}