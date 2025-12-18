import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-md w-full text-center border border-gray-200">
        <div className="flex justify-center items-center mb-6">
          <svg className="h-16 w-16 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Access Denied</h1>
        <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white font-medium px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;