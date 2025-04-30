"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful, redirecting to home page");
      router.push("/profile");
    } catch (error: any) {
      console.log("Error signing up", error.message);
      toast.error("Error signing up, please try again later");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
      <h1>{loading ? "processing..." : "login"}</h1>
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