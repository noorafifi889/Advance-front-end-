 import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type AuthState = {
  user: AuthUser | null;
  status: "idle" | "loading" | "authed" | "guest";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setChecking(state) {
      state.status = "loading";
      state.error = null;
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.status = "authed";
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.status = "guest";
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = "guest";
    },
  },
});

export const { setChecking, setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;