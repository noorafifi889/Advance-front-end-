"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

=  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setUsers(data);
  };

  const addUser = async () => {
    await addDoc(collection(db, "users"), {
      name: "Test User",
      email: "test@gmail.com",
      phone: "0590000000",
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>🔥 Firebase Test Page</h1>

      <button
        onClick={addUser}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        Add Test User
      </button>

      <h2 style={{ marginTop: 30 }}>Users List:</h2>

      {users.map((user) => (
        <div key={user.id} style={{ marginTop: 10 }}>
          {user.name} — {user.email}
        </div>
      ))}
    </main>
  );
}