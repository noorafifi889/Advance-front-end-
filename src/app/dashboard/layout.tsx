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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header full width */}
      <HeaderDashboard
        title="Dashboard"
        user={{
          fullName: auth?.fullName,
          email: auth?.email,
          role: auth?.role,
        }}
      />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar role={auth?.role} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

    </div>
  );
}