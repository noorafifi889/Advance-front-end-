"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  Shield,
  Activity,
  Clock,
  ArrowUpRight,
} from "lucide-react";

function normalizeRole(role?: string) {
  const r = (role ?? "user").toLowerCase();
  return r === "admin" ? "admin" : "user";
}

function StatCard({
  title,
  value,
  icon,
  hint,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gray-50 text-gray-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function HomeDashboard() {
  const auth = useSelector((s: any) => s.auth.user);
  const role = useMemo(() => normalizeRole(auth?.role), [auth?.role]);
  const isAdmin = role === "admin";

  const adminStats = {
    totalUsers: 128,
    totalAdmins: 4,
    activeToday: 23,
    lastLogin: auth?.lastLogin ?? "Today",
    newestUsers: [
      { name: "Noor", email: "noor@email.com", role: "USER" },
      { name: "Ahmad", email: "ahmad@email.com", role: "ADMIN" },
    ],
  };

  const userStats = {
    lastLogin: auth?.lastLogin ?? "Today",
    status: "Active",
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Welcome, {auth?.fullName || "Account"} 👋
            </h2>
            <p className="text-sm text-gray-500">
              {isAdmin
                ? "Here’s a quick overview of your system."
                : "Here’s a quick overview of your account."}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 w-fit">
            <Clock className="h-4 w-4" />
            Last login: {isAdmin ? adminStats.lastLogin : userStats.lastLogin}
          </div>
        </div>
      </div>

      {/* Cards */}
      {isAdmin ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value={adminStats.totalUsers} icon={<Users className="h-5 w-5" />} />
          <StatCard title="Admins" value={adminStats.totalAdmins} icon={<Shield className="h-5 w-5" />} />
          <StatCard title="Active Today" value={adminStats.activeToday} icon={<Activity className="h-5 w-5" />} />
          <StatCard title="System Status" value="Healthy" icon={<ArrowUpRight className="h-5 w-5" />} hint="No incidents" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Account Status" value={userStats.status} icon={<Activity className="h-5 w-5" />} />
        </div>
      )}

      {/* Admin Table */}
      {isAdmin && (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Newest Users</h3>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500">
                <tr className="border-b">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {adminStats.newestUsers.map((u, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-gray-900">{u.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{u.email}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full border bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-700">
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}