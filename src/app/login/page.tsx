"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful, redirecting to home page");
      router.push("/profile");
    } catch (error: any) {
      console.log("Error logging in", error.message);
      toast.error(error.response?.data?.error || "Failed to login. Please try again.");
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
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Monochrome gradient background */}
      <div className="fixed inset-0 bg-gradient-to-tr from-black/60 via-zinc-900/60 to-zinc-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/10 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                  {loading ? "Authenticating..." : "Welcome Back"}
                </h1>
                <p className="text-zinc-400 mt-2 text-sm">
                  Sign in to continue to your account
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-xs font-medium text-zinc-400">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs text-zinc-400 hover:text-white transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      type="password"
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                
                <button
                  className={`w-full py-3.5 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                    buttonDisabled
                      ? "bg-zinc-700 cursor-not-allowed"
                      : loading
                      ? "bg-zinc-700"
                      : "bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900"
                  }`}
                  onClick={onLogin}
                  disabled={buttonDisabled || loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="font-medium text-zinc-300 hover:text-white transition-colors">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}