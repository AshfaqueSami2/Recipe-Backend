// 'use client'
// import { useAuth } from '@/src/utils/AuthContext';
// import Link from 'next/link';
// import React from 'react';

// const Navbar: React.FC = () => {
//   const { isLoggedIn, logOut } = useAuth();

//   return (
//     <nav className="bg-gray-100 shadow-lg rounded-lg">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Left Logo/Title */}
//         <div className="text-lg font-semibold text-gray-800">
//           Material Tailwind
//         </div>

//         {/* Center Navigation */}
//         <div className="flex space-x-8">
//           <a href="#" className="flex items-center text-gray-700 hover:text-black">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18m-9 5h9" />
//             </svg>
//             Pages
//           </a>
//           <a href="#" className="flex items-center text-gray-700 hover:text-black">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5 5 0 0012 19a5 5 0 006.879-1.196M9 11a5 5 0 1110 0m-5 5v3m0 4h.01" />
//             </svg>
//             Account
//           </a>
//         </div>

//         {/* Right Button */}
//         <div>
//           {isLoggedIn ? (
//             <button
//               onClick={logOut}
//               className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link href='/login' className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
//               Login/Register
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import React, { useState } from "react";
import { useAuth } from "@/src/utils/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa"; // Import arrow icon

const Navbar1: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const { isLoggedIn, logOut, user } = useAuth();
  const dashboardRoute = user?.role === 'admin' ? '/adminDashboard' : '/userDashboard';
  const ProfileRoute = user?.role === 'admin' ? '/adminDashboard/profile' : '/userDashboard/profile';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-100 font-sans w-full m-0">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left Section - Logo */}
            <div>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-purple-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.5,16 C14.2238576,16 14,15.7761424 14,15.5 L14,9.5 C14,9.22385763 14.2238576,9 14.5,9 L16,9 C17.1045695,9 18,9.8954305 18,11 C18,11.4116588 17.8756286,11.7942691 17.6624114,12.1123052 C18.4414283,12.3856578 19,13.1275982 19,14 C19,15.1045695 18.1045695,16 17,16 L14.5,16 Z"
                  />
                </svg>
              </Link>
            </div>

            {/* Center Section - Links */}
            <div className="hidden sm:flex sm:items-center space-x-4">
              <Link
                href="/"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
              Home
              </Link>
              <Link
                href="/allrecipe"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
                All Recipes
              </Link>
              <Link
                href="#"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
                Partners
              </Link>
              <Link
                href="#"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
                Pricing
              </Link>
            </div>

            {/* Right Section - Avatar and Logout Button */}
            <div className="relative flex items-center space-x-4">
              {isLoggedIn && user ? (
                <>
                  <button
                    onClick={logOut}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Logout
                  </button>

                  {/* Avatar with Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <img
                        src={user.profilePicture || "/default-avatar.png"}
                        alt="User Avatar"
                        style={{
                          borderRadius: "50%",
                          height: "50px",
                          width: "50px",
                          objectFit: "cover",
                          border: "2px",
                        }}
                      />
                      <FaChevronDown className="text-gray-600" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <Link
                          href={dashboardRoute}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href={ProfileRoute}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                        <div className="border-t border-gray-200"></div>
                        <button
                          onClick={logOut}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-800 text-sm font-semibold hover:text-purple-600"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div
              className="sm:hidden cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-purple-600"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="block sm:hidden bg-white border-t-2 py-2">
              <div className="flex flex-col">
                <Link
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Marketplace
                </Link>
                <Link
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Partners
                </Link>
                <Link
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Pricing
                </Link>
                <div className="flex justify-between items-center border-t-2 pt-2">
                  {isLoggedIn && user ? (
                    <>
                      <Image
                        src={user.profilePicture || "/default-avatar.png"}
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="rounded-full border-2 border-gray-300 shadow-md"
                      />
                      <button
                        onClick={logOut}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/register"
                        className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
