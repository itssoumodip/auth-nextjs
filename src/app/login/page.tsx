"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";


export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onSignup = async () => {}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input 
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="border-2 border-gray-300 rounded-md p-2 mb-4 w-1/3">
      </input>
      <label htmlFor="password">password</label>
      <input 
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="border-2 border-gray-300 rounded-md p-2 mb-4 w-1/3">
      </input>
      <button
        className="bg-gray-600 text-white rounded-md p-2 w-1/3 hover:bg-gray-700"
        onClick={onSignup}
        >
          Login here
      </button>
      <Link href="/signup" className="text-gray-400 hover:underline mt-4">
        Visit Signup page 
      </Link>
    </div>
  );
}   