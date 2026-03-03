"use client";

import React from "react";
import Sidebar from "@/src/components/dashboard/SidebarDashboard";
import HeaderDashboard from "@/src/components/dashboard/HeaderDashboard";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "@/src/modules/auth/service/authThunks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const auth = useSelector((s: any) => s.auth.user);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={auth?.role} />

      <div className="flex-1">
        <HeaderDashboard
          title="Dashboard"
          user={{
            fullName: auth?.fullName,
            email: auth?.email,
            role: auth?.role,
          }}
        />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}