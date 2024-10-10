








"use client";
import React, { useState } from "react";
import { useAuth } from "@/src/utils/AuthContext";
import Link from "next/link";

import { FaChevronDown, FaBars } from "react-icons/fa"; // Importing icons

const Navbar1: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const { isLoggedIn, logOut, user } = useAuth();
  const dashboardRoute =
    user?.role === "admin" ? "/adminDashboard" : "/userDashboard";

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
                <img
                  style={{
                    borderRadius: "50%",
                    width: "45px",
                    height: "45px",
                    objectFit: "cover",
                  }}
                  src="https://i.ibb.co/D1y3v48/Gemini-Generated-Image-f90wwtf90wwtf90w.jpg"
                  alt="Logo"
                />
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
                href="/aboutus"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
                About Us
              </Link>
              <Link
                href="/pricing"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
                Pricing
              </Link>
              <Link
                href="/contactus"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600"
              >
                Contact Us
              </Link>
            </div>

            {/* Right Section - Avatar and Logout Button */}
            <div className="relative flex items-center space-x-4">
              {isLoggedIn && user ? (
                <>
                  <button
                    onClick={logOut}
                    className="hidden sm:block text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
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
                          height: "40px",
                          width: "40px",
                          objectFit: "cover",
                          border: "2px solid #e2e8f0",
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
                          href={`/${
                            user?.role === "admin"
                              ? "adminDashboard"
                              : "userDashboard"
                          }/myprofile/${user._id}`}
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
                    className="hidden sm:block text-gray-800 text-sm font-semibold hover:text-purple-600"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="hidden sm:block text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
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
              <FaBars className="text-2xl text-gray-800" />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="block sm:hidden bg-white border-t-2 py-2">
              <div className="flex flex-col">
                <Link
                  href="/"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Home
                </Link>
                <Link
                  href="/allrecipe"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  All Recipes
                </Link>
                <Link
                  href="/aboutus"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  About Us
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Pricing
                </Link>
                <Link
                  href="/contactus"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                >
                  Contact Us
                </Link>
                <div className="flex justify-between items-center border-t-2 pt-2">
                  {isLoggedIn && user ? (
                    <>
                      <img
                        src={user.profilePicture || "/default-avatar.png"}
                        alt="User Avatar"
                        style={{
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                          objectFit: "cover",
                          border: "2px solid #e2e8f0",
                        }}
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
