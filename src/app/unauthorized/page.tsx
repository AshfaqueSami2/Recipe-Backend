'use client';

import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Unauthorized</h1>
        <p className="text-gray-600 mb-6">
          Oops! You dont have permission to access this page.
        </p>
        <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
