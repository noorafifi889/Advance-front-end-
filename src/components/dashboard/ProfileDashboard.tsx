"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Mail, Phone, MapPin, User2 } from "lucide-react";

type Role = "admin" | "user" | "ADMIN" | "USER";

function normalizeRole(role?: Role) {
  const r = (role ?? "user").toString().toLowerCase();
  return r === "admin" ? "admin" : "user";
}

function InfoBox({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-gray-50 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-white border text-gray-700">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800">{label}:</p>
          <p className="mt-1 truncate text-sm text-gray-600">{value || "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProfileDashboard() {
  const auth = useSelector((s: any) => s.auth.user);

  const role = useMemo(() => normalizeRole(auth?.role), [auth?.role]);
  const isAdmin = role === "admin";

  const imageUrl: string | undefined = auth?.image;

  const displayName = auth?.fullName || "User";
  const initials = (displayName?.[0] || auth?.email?.[0] || "U").toUpperCase();

  return (
    <div className="w-full">
      <div className=" max-w-[100%] py-6">


        {/* Main Card */}
        <div className="rounded-2xl border bg-white shadow-sm">
          {/* Hello */}
          <div className="px-6 pt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Hello,
              <span className="text-blue-600">{displayName.split(" ")[0] || displayName}</span>
            </h3>
            <div className="mx-auto mt-4 h-px w-full max-w-2xl bg-gray-200" />
          </div>

          {/* Avatar + name */}
          <div className="px-6 py-6">
            <div className="flex flex-col items-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-emerald-500 bg-gray-50">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-3xl font-bold text-gray-700">
                    {initials}
                  </div>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold text-gray-800">
                {displayName}
              </p>

             
            </div>

            {/* Info grid (like screenshot 2x2) */}
            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoBox label="Email" value={auth?.email} icon={<Mail className="h-5 w-5" />} />
              <InfoBox
                label="Gender"
                value={auth?.gender || "-"}
                icon={<User2 className="h-5 w-5" />}
              />
              <InfoBox label="Mobile" value={auth?.phone} icon={<Phone className="h-5 w-5" />} />
              <InfoBox label="Address" value={auth?.address} icon={<MapPin className="h-5 w-5" />} />
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center pb-4">
              <button className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}