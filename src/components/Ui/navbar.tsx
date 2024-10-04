'use client'
import { useAuth } from '@/src/utils/AuthContext';
import Link from 'next/link';
import React from 'react';


const Navbar: React.FC = () => {
  const { isLoggedIn, logOut } = useAuth(); 

  return (
    <nav className="bg-gray-100 shadow-lg rounded-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Logo/Title */}
        <div className="text-lg font-semibold text-gray-800">
          Material Tailwind
        </div>

        {/* Center Navigation */}
        <div className="flex space-x-8">
          <a href="#" className="flex items-center text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18m-9 5h9" />
            </svg>
            Pages
          </a>
          <a href="#" className="flex items-center text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5 5 0 0012 19a5 5 0 006.879-1.196M9 11a5 5 0 1110 0m-5 5v3m0 4h.01" />
            </svg>
            Account
          </a>
        </div>

        {/* Right Button */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={logOut}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Logout
            </button>
          ) : (
            <Link href='/login' className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



