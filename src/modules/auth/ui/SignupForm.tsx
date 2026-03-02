"use client";

import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signupThunk, loginGoogleThunk } from "@/src/modules/auth/service/authThunks";

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const status = useSelector((s: any) => s.auth.status);
  const error = useSelector((s: any) => s.auth.error);
  const loading = status === "loading";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const passwordsMatch = useMemo(() => password === confirm, [password, confirm]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanConfirm = confirm.trim();

    if (!cleanName || !cleanEmail || !cleanPassword || !cleanConfirm) {
      setLocalError("Please fill all fields.");
      return;
    }

    if (cleanPassword.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setLocalError("Passwords do not match.");
      return;
    }

    // Signup
    const ok = await dispatch(signupThunk(cleanEmail, cleanPassword) as any);

    if (ok) router.replace("/login");
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
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 mt-1">Start managing users in minutes</p>
        </div>

        {/* Errors */}
        {(localError || error) && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {localError ? localError : String(error)}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full name</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 focus-within:border-indigo-500">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Your name"
                className="w-full outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

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
            <p className="mt-1 text-xs text-gray-400">Use at least 6 characters.</p>
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm password</label>
            <div
              className={`mt-1 flex items-center gap-2 rounded-xl border bg-white px-3 py-2 focus-within:border-indigo-500 ${
                confirm.length === 0
                  ? "border-gray-200"
                  : passwordsMatch
                  ? "border-green-300"
                  : "border-red-300"
              }`}
            >
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {confirm.length > 0 && (
              <p className={`mt-1 text-xs ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                {passwordsMatch ? "Passwords match ✅" : "Passwords do not match ❌"}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
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
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;