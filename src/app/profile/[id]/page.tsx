"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setUser({
            username: "Username",
            _id: params.id
          });
          setLoading(false);
        }, 1000);
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-zinc-900/40 to-black"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-xl font-bold text-white">
                  NextAuth
                </div>
              </div>
              <div>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 ease-out flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Back to Profile
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Public Profile</h1>
              <p className="mt-2 text-sm text-zinc-400">Viewing user information</p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-t-2 border-l-2 border-white animate-spin"></div>
                  <div className="h-16 w-16 rounded-full border-b-2 border-r-2 border-zinc-400 animate-spin absolute inset-0" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <p className="mt-4 text-zinc-400">Loading user profile...</p>
              </div>
            ) : error ? (
              <div className="bg-zinc-900 rounded-md p-8 border border-zinc-800 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Error Loading Profile</h3>
                <p className="text-zinc-400 mb-6">{error}</p>
                <button 
                  onClick={() => router.refresh()}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : user && (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-zinc-900 rounded-md border border-zinc-800 overflow-hidden">
                  <div className="px-6 py-8 flex flex-col items-center sm:flex-row sm:items-start">
                    <div className="relative flex-shrink-0">
                      <div className="h-24 w-24 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 flex items-center justify-center text-white text-3xl font-bold ring-2 ring-zinc-700">
                        {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                      </div>
                    </div>
                    
                    <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left flex-grow">
                      <h2 className="text-2xl font-semibold">{user.username}</h2>
                      
                      <div className="mt-4">
                        <div className="text-sm text-zinc-400">User ID</div>
                        <div className="mt-1 font-mono text-xs text-zinc-500 break-all bg-zinc-800/50 p-2 rounded-md">
                          {user._id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-md border border-zinc-800 overflow-hidden">
                  <div className="px-6 py-6">
                    <div className="flex items-center mb-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-md bg-zinc-800 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <h3 className="text-lg font-medium">About</h3>
                    </div>

                    <p className="text-zinc-400 text-sm">
                      This is a public profile page. Only basic information about this user is displayed here.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}