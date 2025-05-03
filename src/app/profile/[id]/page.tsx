"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        if (!params.id) {
          setError("Missing user ID");
          setLoading(false);
          return;
        }
        
        console.log("Fetching user profile with ID:", params.id);
        const response = await axios.get(`/api/users/me?userId=${params.id}`);
        
        if (response.data.success) {
          console.log("User data received:", response.data.data);
          setUser(response.data.data);
        } else {
          setError(response.data.error || "User not found");
        }
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        setError(error.response?.data?.error || "Failed to load user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [params.id]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    } catch (error) {
      console.error("Error formatting date-time:", error);
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-gradient-to-tr from-black/60 via-zinc-900/60 to-zinc-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="border-b border-white/10 backdrop-blur-md bg-black/20">
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
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900 transition-all duration-200 ease-out flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Back to My Profile
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">User Profile</h1>
              <p className="mt-2 text-sm text-zinc-400">Viewing public information about this user</p>
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
              <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8 text-center">
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
            ) : user ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-8">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          {user.profileImage ? (
                            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-zinc-800">
                              <div className="h-32 w-32 bg-zinc-800 flex items-center justify-center">
                                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-5xl font-bold">
                                  {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                                </div>
                                <img
                                  src={user.profileImage}
                                  alt={user.username || "User"}
                                  className="absolute inset-0 h-full w-full object-cover rounded-full"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-5xl font-bold border-4 border-zinc-800">
                              {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                            </div>
                          )}
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold">{user.username || "Anonymous User"}</h2>

                        <div className="mt-6 w-full pt-6 border-t border-white/5">
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/5">
                              <span className="text-sm">Member status</span>
                              <span className="px-2 py-1 text-xs rounded bg-emerald-500/20 text-emerald-300">
                                {user.isVerified ? "Verified" : "Active"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-6">
                      <div className="flex items-center mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <h3 className="text-lg font-medium">About {user.username || "this user"}</h3>
                      </div>

                      <div className="space-y-4">
                        {user.bio ? (
                          <p className="text-zinc-300">{user.bio}</p>
                        ) : (
                          <p className="text-zinc-400 italic">This user hasn't added a bio yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-6">
                      <div className="flex items-center mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <h3 className="text-lg font-medium">Recent Activity</h3>
                      </div>

                      <div className="space-y-4">
                        {user.createdAt && (
                          <div className="border-l-2 border-zinc-700 pl-4 py-2">
                            <div className="text-sm">
                              <span className="text-zinc-400">Joined the platform</span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                              {formatDateTime(user.createdAt)}
                            </p>
                          </div>
                        )}

                        {user.lastLogin && (
                          <div className="border-l-2 border-zinc-700 pl-4 py-2">
                            <div className="text-sm">
                              <span className="text-zinc-400">Last logged in</span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                              {formatDateTime(user.lastLogin)}
                            </p>
                          </div>
                        )}
                        
                        {!user.createdAt && !user.lastLogin && (
                          <p className="text-zinc-400 italic">No activity information available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">User Not Found</h3>
                <p className="text-zinc-400 mb-6">The user profile you're looking for could not be found.</p>
                <Link 
                  href="/profile"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors inline-block"
                >
                  Back to Your Profile
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}