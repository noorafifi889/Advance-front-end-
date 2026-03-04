"use client";

import React from "react";
import { Shield, User2, LogOut, Search } from "lucide-react";
import { logoutThunk } from "@/src/modules/auth/service/authThunks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Role = "admin" | "user" | "ADMIN" | "USER";

type Props = {
  title?: string;
  user: {
    fullName?: string;
    email?: string;
    role?: Role;
  };
  onSearch?: (q: string) => void;
};

function normalizeRole(role?: Role) {
  const r = (role ?? "user").toString().toLowerCase();
  return r === "admin" ? "admin" : "user";
}

export default function HeaderDashboard({
  title = "Dashboard",
  user,
  onSearch,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const role = normalizeRole(user.role);
  const isAdmin = role === "admin";

  const handleLogout = async () => {
    await dispatch(logoutThunk() as any);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur">
      {/* Full width container */}
      <div className="w-full px-4">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl text-white shadow-sm ${
                isAdmin ? "bg-rose-600" : "bg-indigo-600"
              }`}
            >
              {isAdmin ? <Shield className="h-5 w-5" /> : <User2 className="h-5 w-5" />}
            </div>

            <div className="leading-tight">
              <p className="text-sm text-gray-500">User Management</p>
              <h1 className="text-base font-semibold text-gray-900">{title}</h1>
            </div>
          </div>

          {/* Desktop Search (takes remaining space) */}
          <div className="hidden flex-1 sm:flex">
            <div className="mx-4 flex w-full max-w-md items-center gap-2 rounded-xl border bg-white px-3 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                placeholder="Search users, emails..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-2">
            {/* Role badge (hide on small) */}
            <span
              className={`hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${
                isAdmin
                  ? "border border-rose-200 bg-rose-50 text-rose-700"
                  : "border border-indigo-200 bg-indigo-50 text-indigo-700"
              }`}
            >
              {isAdmin ? "Admin" : "User"}
            </span>

            {/* User box */}
            <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-700">
                {(user.fullName?.[0] || user.email?.[0] || "U").toUpperCase()}
              </div>

              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {user.fullName || "Account"}
                </p>
                <p className="text-xs text-gray-500">{user.email || ""}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm sm:px-4 ${
                isAdmin ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mx-auto max-w-7xl pb-3 sm:hidden">
          <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              placeholder="Search users, emails..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}