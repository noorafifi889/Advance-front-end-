"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User2, KeyRound, Users, BarChart3, Settings } from "lucide-react";

type Role = "admin" | "user" | "ADMIN" | "USER";

function normalizeRole(role?: Role) {
  const r = (role ?? "user").toString().toLowerCase();
  return r === "admin" ? "admin" : "user";
}

type Props = {
  role?: Role;
};

export default function Sidebar({ role }: Props) {
  const pathname = usePathname();
  const r = normalizeRole(role);
  const isAdmin = r === "admin";

  const baseMenu = useMemo(
    () => [
      { label: "Home", href: "/dashboard", icon: Home },
      { label: "Profile", href: "/dashboard/profile", icon: User2 },
      { label: "Change Password", href: "/dashboard/change-password", icon: KeyRound },
    ],
    []
  );

  const adminMenu = useMemo(
    () => [
      { label: "Users", href: "/dashboard/users", icon: Users },
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    []
  );

  const menu = isAdmin ? [...baseMenu, ...adminMenu] : baseMenu;

  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-4">
        <div className="text-sm text-gray-500">Navigation</div>
      </div>

      <nav className="px-3 pb-4 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-3 text-xs text-gray-500 border-t">
        Role: <span className="font-semibold">{isAdmin ? "Admin" : "User"}</span>
      </div>
    </aside>
  );
}