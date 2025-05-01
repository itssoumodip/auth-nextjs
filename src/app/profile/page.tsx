"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

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

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log("User details", res.data);
    setData(res.data.data._id);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="text-2xl font-bold p-3 m-4 bg-orange-300/40 rounded">
        User ID: {data === 'nothing' ? "Nothing" : (
          <Link href={`/profile/${data}`}>
            {data}
          </Link>
        )}
      </h2>
      <hr />
      <button 
        onClick={logout}
        className="bg-red-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out">
        Logout
      </button>

      <button 
        onClick={getUserDetails}
        className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
        Get User Details
      </button>
    </div>
  );
}