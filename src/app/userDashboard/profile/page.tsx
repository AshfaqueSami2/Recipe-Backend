"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/utils/AuthContext"; // Access the context
import { useRouter } from "next/navigation";
import PrivateRoute from "@/src/utils/privateRoute";
import { toast } from "sonner"; // Assuming you want to show toast notifications for success/error messages
import { motion } from "framer-motion"; // Import framer-motion

const Profile: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false); // Controls edit mode
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    bio: user?.bio || "",
    address: user?.address || "",
  });

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // Handle input change for editable fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle saving changes
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setEditMode(false); // Exit edit mode after successful save
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show a loading state if user data is not available yet
  }

  // Framer Motion animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.10 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <PrivateRoute allowedRoles={["user"]}>
      <div className="flex justify-center items-center min-h-screen p-6">
        {/* Motion Animated Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10"
        >
          {/* Profile Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Profile</h1>
            <div className="relative">
              <img
                src={user.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md mx-auto"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mt-4">{user.name}</h2>
            <p className="text-lg text-gray-500">{user.email}</p>
          </div>

          {/* Account Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                    readOnly
                  />
                </div>
                {editMode ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={user.phone || "N/A"}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                      readOnly
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Address and Bio */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h2>
              {editMode ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                      rows={4}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={user.address || "N/A"}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={user.bio || "N/A"}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                      rows={4}
                      readOnly
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Edit and Save Buttons */}
          <div className="flex justify-end mt-8 space-x-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
