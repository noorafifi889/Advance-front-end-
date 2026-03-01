import { clearUser, setChecking, setError, setUser } from "./authSlice";
import {
  listenToAuthChanges,
  loginWithEmail,
  loginWithGoogle,
  logoutFirebase,
  signupWithEmail,
} from "./auth.firebase";
import { AppDispatch } from "@/src/shared/state/store";

function mapUser(u: any) {
  return { uid: u.uid, email: u.email, displayName: u.displayName };
}

// 1) Listener مرة واحدة عند بداية التطبيق
export const startAuthListener = () => (dispatch: AppDispatch) => {
  dispatch(setChecking());

  return listenToAuthChanges((u) => {
    if (u) dispatch(setUser(mapUser(u)));
    else dispatch(clearUser());
  });
};

// 2) Login Email
export const loginEmailThunk =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setChecking());
    try {
        const cleanEmail = email.trim();
const cleanPassword = password.trim();
      await loginWithEmail(cleanEmail, cleanPassword);
    } catch (e: any) {
      dispatch(setError(e.message));
        console.log("FIREBASE AUTH ERROR:", e.code, e.message);
  alert(e.code);
    }
  };

// 3) Signup
export const signupThunk =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setChecking());
    try {
      await signupWithEmail(email, password);
    } catch (e: any) {
      dispatch(setError(e.message));
    }
  };

// 4) Google
export const loginGoogleThunk = () => async (dispatch: AppDispatch) => {
  dispatch(setChecking());
  try {
    await loginWithGoogle();
  } catch (e: any) {
    dispatch(setError(e.message));
  }
};

// 5) Logout
export const logoutThunk = () => async (dispatch: AppDispatch) => {
  dispatch(setChecking());
  try {
    await logoutFirebase();
    // listener رح يعمل clearUser
  } catch (e: any) {
    dispatch(setError(e.message));
  }
};