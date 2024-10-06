"use client";
import { useAuth } from "@/src/utils/AuthContext";
import { CameraIcon } from "@heroicons/react/16/solid";
import React from "react";

const UserProfile = () => {
 

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex space-x-6">
          {/* Account Information */}
          <div className="w-1/2 border-r border-gray-200 p-4">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="relative mb-6">
              <img
                className="w-24 h-24 rounded-full mx-auto object-cover"
                src={"https://via.placeholder.com/150"}
                alt="profile"
              />
              <div className="absolute bottom-0 right-2 bg-white p-2 rounded-full shadow-md">
                <CameraIcon className="h-6 w-6 text-gray-700" />
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  readOnly
                />
              </div>
            </form>
          </div>

          {/* Password Section */}
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Current Password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;



<div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 flex space-x-6">
    {/* Account Information */}
    <div className="w-1/2 border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      <div className="relative mb-6">
        <img
          className="w-24 h-24 rounded-full mx-auto object-cover"
          src={"https://via.placeholder.com/150"}
          alt="profile"
        />
        <div className="absolute bottom-0 right-2 bg-white p-2 rounded-full shadow-md">
          <CameraIcon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            readOnly
          />
        </div>
      </form>
    </div>

    {/* Password Section */}
    <div className="w-1/2 p-4">
      <h2 className="text-xl font-semibold mb-4">Password</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Current Password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</div>;




