"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginEmailThunk, loginGoogleThunk } from "@/src/modules/auth/service/authThunks";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  
  const status = useSelector((s: any) => s.auth.status);
  const error = useSelector((s: any) => s.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const loading = status === "loading";

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  if (!cleanEmail || !cleanPassword) return;

  const ok = await dispatch(loginEmailThunk(cleanEmail, cleanPassword) as any);
  if (ok) router.replace("/dashboard");
};

const onGoogle = async () => {
  const ok = await dispatch(loginGoogleThunk() as any);
  if (ok) router.replace("/dashboard");
};
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Login to manage your users securely</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {String(error)}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 focus-within:border-indigo-500">
              <Mail className="h-5 w-5 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 focus-within:border-indigo-500">
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-700"
              onClick={() => alert("Add Forgot Password flow later")}
            >
              Forgot password?
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google */}
        <button
          onClick={onGoogle}
          disabled={loading}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?
          <button
            onClick={() => router.push("/signup")}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;