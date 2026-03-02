"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { logoutThunk } from "../modules/auth/service/authThunks";
import { useDispatch } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
const dispatch = useDispatch();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 shadow-sm bg-white">
        <h1 className="text-xl font-bold text-indigo-600">
          User Management
        </h1>

        <div className="space-x-4">
  {user ? (
    <>
      <button
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Dashboard
      </button>

      <button
        onClick={async () => {
await dispatch(logoutThunk() as any);
          router.push("/login");
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => router.push("/login")}
        className="px-4 py-2 text-indigo-600 font-medium"
      >
        Login
      </button>

      <button
        onClick={() => router.push("/signup")}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Get Started
      </button>
    </>
  )}
</div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Manage Your Users Easily & Securely
        </h2>

        <p className="text-gray-600 max-w-xl mb-6">
          A modern user management system built with Firebase authentication
          and Redux state management for a seamless experience.
        </p>

        <button
          onClick={() => router.push(user ? "/dashboard" : "/login")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          {user ? "Go to Dashboard" : "Start Now"}
        </button>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">

          <div className="p-6 shadow rounded-xl">
            <h3 className="font-semibold text-lg mb-2 text-black">Secure Authentication</h3>
            <p className="text-gray-600">
              Login with Email or Google using Firebase authentication.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl">
            <h3 className="font-semibold text-lg mb-2 text-black">Real-Time Updates</h3>
            <p className="text-gray-600">
              Instant user state updates with Redux.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl">
            <h3 className="font-semibold text-lg mb-2 text-black">Scalable Architecture</h3>
            <p className="text-gray-600">
              Built with Next.js App Router for modern performance.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 User Management System
      </footer>
    </div>
  );
}