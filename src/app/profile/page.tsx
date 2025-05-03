"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    _id: "",
    profileImage: "",
    bio: "",
    createdAt: ""
  });
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState({
    username: "",
    email: "",
    bio: ""
  });
  const [updating, setUpdating] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log("User details", res.data);
      setData(res.data.data._id);
      const userData = {
        username: res.data.data.username || "",
        email: res.data.data.email || "",
        _id: res.data.data._id || "",
        profileImage: res.data.data.profileImage || "",
        bio: res.data.data.bio || "",
        createdAt: res.data.data.createdAt || ""
      };
      setUser(userData);
      setEditUser({
        username: userData.username,
        email: userData.email,
        bio: userData.bio
      });
    } catch (error) {
      console.error("Error fetching user details", error);
      toast.error("Could not fetch user details");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenEditModal = () => {
    setEditUser({
      username: user.username,
      email: user.email,
      bio: user.bio
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const response = await axios.put("/api/users/update", editUser);
      console.log("Profile updated", response.data);

      setUser({
        ...user,
        username: response.data.data.username,
        email: response.data.data.email,
        bio: response.data.data.bio
      });

      toast.success("Profile updated successfully");
      setShowEditModal(false);
    } catch (error: any) {
      console.error("Error updating profile", error);
      const errorMessage = error.response?.data?.error || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleImageClick = () => {
    if (user.profileImage) {
      setShowImageModal(true);
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editFileInputRef.current) {
      editFileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error('Image must be less than 3MB');
      return;
    }

    try {
      setUploadingImage(true);
      toast.loading('Updating image...');

      const base64 = await convertToBase64(file);

      const response = await axios.post('/api/users/upload-image', {
        imageBase64: base64
      });

      setUser({
        ...user,
        profileImage: response.data.profileImage
      });

      toast.dismiss();
      toast.success('Profile image updated');
    } catch (error: any) {
      console.error('Error Updating image:', error);
      toast.dismiss();
      toast.error(error.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error('Image must be less than 3MB');
      return;
    }

    try {
      setUploadingImage(true);
      toast.loading('Updating image...');

      const base64 = await convertToBase64(file);

      const response = await axios.post('/api/users/upload-image', {
        imageBase64: base64
      });

      setUser({
        ...user,
        profileImage: response.data.profileImage
      });

      toast.dismiss();
      toast.success('Profile image updated');
    } catch (error: any) {
      console.error('Error updating image:', error);
      toast.dismiss();
      toast.error(error.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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

      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="border-b border-white/10 backdrop-blur-md bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-xl font-bold bg-clip-text text-white">
                  NextAuth
                </div>
              </div>
              <div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900 transition-all duration-200 ease-out flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-5h-2v4H4V4h10v4h2V4a2 2 0 00-2-2H4a2 2 0 00-2 2z" clipRule="evenodd" />
                    <path d="M13 7h6v2h-6V7zM16 10l-4-3v6l4-3z" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Profile</h1>
              <p className="mt-2 text-sm text-zinc-400">Manage your account information and settings</p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-t-2 border-l-2 border-white animate-spin"></div>
                  <div className="h-16 w-16 rounded-full border-b-2 border-r-2 border-zinc-400 animate-spin absolute inset-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <p className="mt-4 text-zinc-400">Loading your profile information...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-8">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          {/* Profile image with upload functionality */}
                          <div
                            className="h-24 w-24 rounded-full overflow-hidden relative cursor-pointer group"
                            onClick={handleImageClick}
                          >
                            {user.profileImage ? (
                              <Image
                                src={user.profileImage}
                                alt={user.username}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-3xl font-bold">
                                {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>

                          {/* Hidden file input */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                          />

                          <span className="absolute bottom-1 right-1 w-4 h-4 bg-zinc-300 rounded-full border-2 border-zinc-900"></span>
                        </div>

                        <h2 className="mt-4 text-xl font-semibold">{user.username}</h2>
                        <p className="text-zinc-400 text-sm break-all mt-1">{user.email}</p>
                        
                        {user.bio && (
                          <p className="mt-3 text-sm text-center text-zinc-300 border-t border-white/5 pt-3">
                            {user.bio}
                          </p>
                        )}

                        <button
                          onClick={handleOpenEditModal}
                          className="mt-6 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 flex items-center justify-center transition-all gap-2 group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Profile
                        </button>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex flex-col space-y-4">
                          <Link href={`/profile/${user._id}`} className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group">
                            <span className="text-sm">Public Profile</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>

                          <button
                            onClick={getUserDetails}
                            className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                          >
                            <span className="text-sm">Refresh Data</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-2 space-y-6">
                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-6">
                      <div className="flex items-center mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <h3 className="text-lg font-medium">Account Information</h3>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Username</label>
                          <div className="bg-white/5 rounded-lg border border-white/10 px-4 py-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm">{user.username}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                          <div className="bg-white/5 rounded-lg border border-white/10 px-4 py-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm break-all">{user.email}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1.5">User ID</label>
                          <div className="relative">
                            <div className="bg-white/5 rounded-lg border border-white/10 px-4 py-3 font-mono text-xs break-all">
                              {user._id}
                            </div>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <Link
                                href={`/profile/${user._id}`}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs text-zinc-300 hover:bg-white/5 transition-colors"
                              >
                                View
                                <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-6">
                      <div className="flex items-center mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                        <h3 className="text-lg font-medium">Security & Activity</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                              <div className="text-sm">Account Status</div>
                              <div className="text-xs text-zinc-400">Your account is active</div>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-zinc-700/30 text-zinc-300 rounded-md text-xs">Active</span>
                        </div>

                        <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <div className="text-sm">Last Sign In</div>
                              <div className="text-xs text-zinc-400">{new Date().toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add bio section */}
                  <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                    <div className="px-6 py-6">
                      <div className="flex items-center mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <h3 className="text-lg font-medium">About You</h3>
                      </div>

                      <div className="space-y-4">
                        {user.bio ? (
                          <p className="text-zinc-300 bg-white/5 rounded-lg border border-white/10 px-4 py-3">{user.bio}</p>
                        ) : (
                          <p className="text-zinc-400 italic bg-white/5 rounded-lg border border-white/10 px-4 py-3">
                            You haven't added a bio yet. Click "Edit Profile" to add information about yourself.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Full screen image modal */}
      {showImageModal && user.profileImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowImageModal(false)}
          ></div>

          <div className="relative z-10 max-w-screen-lg max-h-screen flex flex-col items-center">
            <div className="relative">
              <Image
                src={user.profileImage}
                alt={user.username}
                width={600}
                height={600}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              />

              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-4 -right-4 bg-zinc-800 rounded-full p-2 text-white hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleEditImageClick}
                className="px-4 py-2 bg-zinc-800 rounded-md text-white hover:bg-zinc-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                <span>Change Photo</span>
              </button>

              <input
                type="file"
                ref={editFileInputRef}
                onChange={handleEditImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={handleCloseEditModal}></div>

          <div className="relative bg-zinc-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all sm:scale-100 opacity-100">
            <div className="absolute top-0 inset-x-0 h-1 bg-zinc-600"></div>

            <div className="px-6 pt-6 pb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Edit Profile</h3>
                <button
                  onClick={handleCloseEditModal}
                  className="rounded-md text-zinc-400 hover:text-white focus:outline-none"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-zinc-400 mb-5">Update your personal information</p>

              {/* Add profile image to edit modal */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div
                    className="h-24 w-24 rounded-full overflow-hidden cursor-pointer group border-2 border-zinc-700"
                    onClick={handleEditImageClick}
                  >
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.username}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-3xl font-bold">
                        {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>

                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-xs font-medium text-zinc-400 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={editUser.username}
                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-xs font-medium text-zinc-400 mb-1">
                    Bio <span className="text-zinc-500">(optional)</span>
                  </label>
                  <textarea
                    id="bio"
                    value={editUser.bio}
                    onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 text-white rounded-lg border border-white/10 focus:border-zinc-500 focus:ring focus:ring-zinc-500/20 focus:outline-none"
                    placeholder="Tell others a little about yourself..."
                    rows={3}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button
                    type="button"
                    className="flex-1 py-2 px-4 border border-white/10 rounded-md text-sm font-medium text-zinc-300 bg-white/5 hover:bg-white/10 focus:outline-none"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}