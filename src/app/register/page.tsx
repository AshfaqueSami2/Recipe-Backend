"use client";
import registerBanner from "./../../assets/loginpage.jpg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Access Next.js router for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://recipebackend-phi.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phoneNumber,
            address,
            profilePicture, // Send profile picture URL
            role: "user", // Default role set as "user"
          }),
        }
      );

      const data = await response.json();

      // Handle unsuccessful response
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful! Please log in.");

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <Image
          src={registerBanner}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Create a new account
          </h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error}
              </div>
            )}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Profile Picture</label>
              <input
                type="text"
                placeholder="Enter Profile Picture URL"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-[#F4A563] hover:bg-[#F09030] focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Register
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
