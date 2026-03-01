"use client";

import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { loginEmailThunk, loginGoogleThunk } from "../modules/auth/service/authThunks";

export default function Home() {
 const dispatch = useDispatch();
  const { status, error } = useSelector((s: any) => s.auth);

  return (
    <div>
      <button onClick={() => (dispatch as any)(loginGoogleThunk())}>
        Login with Google
      </button>

      <button onClick={() => (dispatch as any)(loginEmailThunk("a@a.com", "123456"))}>
        Login Email
      </button>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
