import { clearUser, setChecking, setError, setUser } from "./authSlice";
import {
  listenToAuthChanges,
  loginWithEmail,
  loginWithGoogle,
  logoutFirebase,
  signupWithEmail,
  saveUserProfile,
  getUserProfile,
} from "./auth.firebase";
import { AppDispatch } from "@/src/shared/state/store";

function mapUser(u: any, profile?: any) {
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName,
    // دمج بيانات Firestore
    fullName: profile?.fullName ?? u.displayName ?? "",
    phone: profile?.phone ?? "",
    birthDate: profile?.birthDate ?? "",
    role: profile?.role ?? "USER",
    bio: profile?.bio ?? "",
    address: profile?.address ?? "",
  };
}

export const startAuthListener = () => (dispatch: AppDispatch) => {
  dispatch(setChecking());

  return listenToAuthChanges(async (u) => {
    if (!u) {
      dispatch(clearUser());
      return;
    }

    const profile = await getUserProfile(u.uid); // 
    dispatch(setUser(mapUser(u, profile)));
  });
};
// 2) Login Email
export const loginEmailThunk =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setChecking());
    try {
      await loginWithEmail(email, password);
      return true;
    } catch (e: any) {
      dispatch(setError(e.code));
      return false;
    }
  };

// 3) Signup
export const signupThunk =
  (payload: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    birthDate: string;
    role: "USER" | "ADMIN";
    bio?: string;
    address?: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setChecking());
    try {
      // 1) Create auth user
      const cred = await signupWithEmail(payload.email, payload.password);

      // 2) Save extra fields in Firestore
      await saveUserProfile(cred.user.uid, {
        fullName: payload.fullName,
        phone: payload.phone,
        birthDate: payload.birthDate,
role: payload.role.toLowerCase(), 
        bio: payload.bio ?? "",
        address: payload.address ?? "",
        createdAt: Date.now(),
      });

      return true;
    } catch (e: any) {
      dispatch(setError(e.message || e.code));
      return false;
    }
  };

// 4) Google
export const loginGoogleThunk = () => async (dispatch: any) => {
  dispatch(setChecking());
  try {
    await loginWithGoogle();
    return true;
  } catch (e: any) {
    dispatch(setError(e.code));
    return false;
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