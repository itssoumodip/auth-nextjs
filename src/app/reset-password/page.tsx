"use client";

import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error("Missing reset token");
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/users/reset-password", {
        token,
        password
      });
      
      toast.success("Password reset successful");
      setResetComplete(true);
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
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
              {resetComplete ? (
                <div className="text-center">
                  <div className="py-6 flex justify-center">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-full">
                      <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold">Success!</h1>
                  <p className="mt-4 text-zinc-400">
                    Your password has been reset successfully. You will be redirected to the login page shortly.
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/login"
                      className="inline-flex justify-center w-full py-3 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-medium text-white transition-all duration-300"
                    >
                      Go to Login
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                      {loading ? "Resetting Password..." : "Reset Password"}
                    </h1>
                    <p className="text-zinc-400 mt-2 text-sm">
                      Create a new secure password for your account
                    </p>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none transition-all"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label htmlFor="confirmPassword" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                        </span>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none transition-all"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3.5 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                        loading
                          ? "bg-zinc-700 cursor-not-allowed"
                          : "bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900"
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Resetting...
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </form>
                  
                  <div className="mt-8 text-center">
                    <p className="text-sm text-zinc-400">
                      Remember your password?{" "}
                      <Link href="/login" className="font-medium text-zinc-300 hover:text-white transition-colors">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="fixed inset-0 bg-gradient-to-tr from-black/60 via-zinc-900/60 to-zinc-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/10 transition-all duration-300">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Loading...</h1>
              <div className="mt-6 flex justify-center">
                <div className="h-10 w-10 animate-spin">
                  <svg className="h-full w-full text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}