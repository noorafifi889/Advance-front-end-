"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startAuthListener } from "../modules/auth/service/authThunks";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = (dispatch as any)(startAuthListener());
    return () => unsub?.();
  }, [dispatch]);

  return null;
}