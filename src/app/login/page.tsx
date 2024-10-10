// 'use client';
// import loginBanner from "./../../assets/pexels-photo-1640777.jpeg";
// import { useAuth } from "@/src/utils/AuthContext";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const { logIn } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch("https://recipebackend-phi.vercel.app/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       // Extract the role and token from the correct part of the response
//       const { token } = result;
//       const role = result.data?.role;  // Make sure to access the role from data

//       if (role && token) {
//         // Log in and store token and role
//         console.log("Login successful, storing token and role:", token, role);
//         logIn(token, role);
//         toast.success("Login successful!");
//       } else {
//         throw new Error("Missing token or role in the response");
//       }
//     } catch (error: any) {
//       console.log(error);
//       setError(error.message || "An error occurred during login.");
//       toast.error(error.message);
//     }
//   };

//   return (
//     <section className="flex flex-col md:flex-row h-screen items-center">
//       <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
//         <Image
//           src={loginBanner}
//           alt="Background"
//           className="w-full h-full object-cover brightness-90"
//         />
//       </div>

//       <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
//         <div className="w-full h-100">
//           <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
//             Log in to your account
//           </h1>

//           <form className="mt-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="text-red-500 text-sm text-center mb-4">
//                 {error}
//               </div>
//             )}
//             <div>
//               <label className="block text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="Enter Email Address"
//                 className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
//                 autoFocus
//                 autoComplete="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mt-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"

//                 className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="text-right mt-2">
//               <Link href="/forgot-password" className="text-sm font-semibold text-gray-700 hover:text-blue-700">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full block bg-[#F4A563] hover:bg-[#F09030] text-white font-semibold rounded-lg px-4 py-3 mt-6"
//             >
//               Log In
//             </button>
//           </form>

//           <hr className="my-6 border-gray-300 w-full" />

//           <p className="mt-8">
//             Need an account?{" "}
//             <Link href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
//               Create an account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
"use client";

import loginBanner from "./../../assets/pexels-photo-1640777.jpeg";
import { useAuth } from "@/src/utils/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from 'next/navigation'
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { logIn } = useAuth();
  const router = useRouter(); // Initialize useRouter to handle redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://recipebackend-phi.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Extract the role and token from the correct part of the response
      const { token, data } = result;
      const role = data?.role; // Make sure to access the role from the data

      if (role && token) {
        // Log in and store token and role
        logIn(token, data); // Pass user data (not just role) to logIn
        toast.success("Login successful!");

        // Handle redirection after successful login
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get("redirect") || "/"; // Get the redirect parameter or default to home

        router.push(redirectUrl); // Redirect the user after login
      } else {
        throw new Error("Missing token or role in the response");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred during login.");
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
          src={loginBanner}
          alt="Background"
          className="w-full h-full object-cover brightness-90"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error}
              </div>
            )}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="email"
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

            <div className="text-right mt-2">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full block bg-[#F4A563] hover:bg-[#F09030] text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Need an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
