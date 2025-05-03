"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/verifyemail", {token})
            setVerified(true);
            setLoading(false);
        } catch (error: any) { 
            console.error("Error verifying email", error.response?.data?.error || error.message);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length>0) {
            verifyUserEmail();
        } else {
            setLoading(false);
        }
    }, [token])

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0b13] to-[#13151f] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative bg-[#1a1f2f]/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/30 overflow-hidden">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
                        
                        <div className="absolute inset-0 opacity-10" style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                        
                        <div className="relative px-8 py-12 text-center">
                            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-sm mb-4">
                                <div className="h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
                                <span className="text-white/80 text-sm font-medium">Email Verification</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white">
                                {loading ? "Verifying Your Email..." : verified ? "Email Verified!" : "Verification Failed"}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-20 h-20 relative">
                                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200/20 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                                </div>
                                <p className="mt-6 text-blue-200/80 text-center">Please wait while we verify your email address...</p>
                            </div>
                        )}
                        
                        {verified && !loading && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-500/20">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Success!</h2>
                                <p className="text-gray-400 mb-8 max-w-sm mx-auto">Your email has been verified successfully. You can now log in to access your account.</p>
                                <Link 
                                    href="/login" 
                                    className="inline-flex items-center justify-center w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Continue to Login
                                </Link>
                            </div>
                        )}
                        
                        {error && !loading && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-red-500/20">
                                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Verification Failed</h2>
                                <p className="text-gray-400 mb-8 max-w-sm mx-auto">We couldn't verify your email. The verification link may have expired or is invalid.</p>
                                <Link 
                                    href="/login" 
                                    className="inline-flex items-center justify-center w-full py-3.5 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Return to Login
                                </Link>
                                <p className="mt-6 text-gray-500 text-sm">
                                    Need help? <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Contact support</a>
                                </p>
                            </div>
                        )}
                        
                        {!token && !loading && !verified && !error && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-amber-500/20">
                                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Missing Verification Token</h2>
                                <p className="text-gray-400 mb-8 max-w-sm mx-auto">No verification token was provided. Please use the link from your verification email.</p>
                                <div className="space-y-4">
                                    <Link 
                                        href="/login" 
                                        className="inline-flex items-center justify-center w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Return to Login
                                    </Link>
                                    <button 
                                        className="inline-flex items-center justify-center w-full py-3.5 px-4 bg-[#1e293b]/50 hover:bg-[#1e293b] text-white rounded-xl font-medium transition-all duration-300 border border-gray-700/30"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Resend Verification Email
                                    </button>
                                </div>
                                <p className="mt-6 text-gray-500 text-sm">
                                    Need help? <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Contact support</a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}