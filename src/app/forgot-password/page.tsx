"use client";

import axios from "axios";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [devMode, setDevMode] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot-password", { email });
      console.log("Response:", response.data);
      
      if (response.data.devMode) {
        toast.success("Development mode: Password reset link available in server console");
        setDevMode(true);
      } else {
        toast.success("Reset link sent to your email");
      }
      
      setEmailSent(true);
    } catch (error: any) {
      console.error("Forgot password error:", error);
      const errorMessage = error.response?.data?.error || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8 rounded-md border border-gray-800 bg-gray-900 p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
          <p className="mt-2 text-sm text-gray-400">
            {!emailSent ? "Enter your email to receive a password reset link" : "Reset link sent!"}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 text-center">
            {devMode ? (
              <div className="mb-4 rounded-md bg-blue-500/10 p-3 text-sm text-blue-400">
                <p>Development Mode: Check your console logs for the password reset link.</p>
              </div>
            ) : null}
            <p className="text-sm text-gray-400">
              {devMode 
                ? "In development mode, the password reset link is displayed in your server console instead of being sent by email."
                : "We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password."
              }
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => {
                  setEmailSent(false);
                  setDevMode(false);
                }}
                className="text-indigo-400 hover:text-indigo-300"
              >
                try again
              </button>
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Remember your password?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}