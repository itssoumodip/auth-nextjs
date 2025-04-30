"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => { 
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout success", response.data)
      toast.success("Logout successful, redirecting to login page");
      router.push('/login')
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Error logging out, please try again later");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <button 
        onClick={logout}
        className="bg-red-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out">
        Logout
      </button>
    </div>
  );
}