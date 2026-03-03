"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderDashboard from "@/src/components/dashboard/HeaderDashboard"
import { logoutThunk } from "@/src/modules/auth/service/authThunks"

const Dashboard = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state: any) => state.auth.user) //  

  return (
    <div>
      <HeaderDashboard
        title="User Dashboard"
        user={{
          fullName: auth?.fullName,
          email: auth?.email,
          role: auth?.role,
        }}
        onLogout={() => dispatch(logoutThunk() as any)}
        onSearch={(q) => console.log(q)}
      />
    </div>
  )
}

export default Dashboard