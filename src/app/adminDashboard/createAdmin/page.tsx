"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const CreateAdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profilePicture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://recipebackend-phi.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            role: "admin", // Set the role to admin by default
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Admin created successfully!"); // Show success toast
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          profilePicture: "",
        });

        // Redirect to another page after success
        setTimeout(() => {
          redirect("/adminDashboard/users"); // Redirect after toast
        }, 2000); // Slight delay to show the toast
      } else {
        toast.error(data.message || "Something went wrong"); // Show error toast
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error("An error occurred while creating the admin.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-8">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* Add Toaster for displaying toast */}
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture (URL)
            </label>
            <input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminPage;
