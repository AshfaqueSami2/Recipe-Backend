"use client";

import PrivateRoute from "@/src/utils/privateRoute";
import React, { useState } from "react";
import toast from "react-hot-toast"; // Importing react-hot-toast

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Fetch the token from local storage or context

      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      const response = await fetch(
        "https://recipebackend-phi.vercel.app/api/auth/change-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (response.ok) {
        toast.success("Password changed successfully!");
        setError("");
      } else if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else {
        setError("Failed to change password.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-6">
        <h1 className="text-2xl font-medium mb-4">Change Password</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showOldPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zM3.207 9.207a1 1 0 011.415 1.415L2 13.5l.707.707 3.207-3.207a1 1 0 111.414 1.414L4.121 15.621a1 1 0 01-1.415 0L.5 12.415 3.207 9.207z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zm0 12a5 5 0 100-10 5 5 0 000 10zM9 9a1 1 0 012 0v1a1 1 0 11-2 0v-1z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showNewPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zM3.207 9.207a1 1 0 011.415 1.415L2 13.5l.707.707 3.207-3.207a1 1 0 111.414 1.414L4.121 15.621a1 1 0 01-1.415 0L.5 12.415 3.207 9.207z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zm0 12a5 5 0 100-10 5 5 0 000 10zM9 9a1 1 0 012 0v1a1 1 0 11-2 0v-1z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default ChangePassword;
