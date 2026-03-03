"use client";

import React from "react";
import { Bell, Shield, User2, LogOut, Search } from "lucide-react";

type Role = "admin" | "user" | "ADMIN" | "USER";

type Props = {
  title?: string;
  user: {
    fullName?: string;
    email?: string;
    role?: Role;
  };
  onLogout: () => void;
  onSearch?: (q: string) => void;
};

function normalizeRole(role?: Role) {
  const r = (role ?? "user").toString().toLowerCase();
  return r === "admin" ? "admin" : "user";
}

export default function HeaderDashboard({ title = "Dashboard", user, onLogout, onSearch }: Props) {
  const role = normalizeRole(user.role);
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        {/* Left: Brand + Title */}
        <div className="flex items-center gap-3">
          <div
            className={`grid h-10 w-10 place-items-center rounded-xl text-white shadow-sm ${
              isAdmin ? "bg-rose-600" : "bg-indigo-600"
            }`}
            aria-label={isAdmin ? "Admin" : "User"}
            title={isAdmin ? "Admin" : "User"}
          >
            {isAdmin ? <Shield className="h-5 w-5" /> : <User2 className="h-5 w-5" />}
          </div>

          <div className="leading-tight">
            <p className="text-sm text-gray-500">User Management</p>
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
          </div>
        </div>

        {/* Center: Search */}
        <div className="ml-auto hidden w-full max-w-md items-center gap-2 rounded-xl border bg-white px-3 py-2 sm:flex">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            placeholder="Search users, emails..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {/* Right: Actions */}
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          {/* Role badge */}
          <span
            className={`hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${
              isAdmin
                ? "bg-rose-50 text-rose-700 border border-rose-200"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
            }`}
          >
            {isAdmin ? "Admin" : "User"}
          </span>


          {/* Avatar */}
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
            onClick={onLogout}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm ${
              isAdmin ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="mx-auto max-w-6xl px-4 pb-3 sm:hidden">
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            placeholder="Search users, emails..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}