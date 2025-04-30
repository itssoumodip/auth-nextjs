"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
      toast.success("Signup successful, please login to continue");
    } catch (error: any) {
      toast.error("Error signing up, please try again later");
      console.log("Error signing up", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
      <h1>{loading ? "Processing... " : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input 
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="border-2 border-gray-300 rounded-md p-2 mb-4 w-1/3">
      </input>
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
          {buttonDisabled ? "Please fill all fields" : "Signup here"}
      </button>
      <Link href="/login" className="text-gray-400 hover:underline mt-4">
        Visit Login page 
      </Link>
    </div>
  );
}   