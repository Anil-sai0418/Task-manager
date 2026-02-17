import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  const searchedUrl = location.pathname;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0b1220] px-6 text-center">
      <div className='w-full justify-center items-center flex flex-row gap-3 mb-4 '>

        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold  ">
        You searched for:
      </p>

      <p className="px-4 py-2  rounded-lg bg-gray-100 dark:bg-gray-800 
                     text-purple-800 dark:text-gray-200 text-sm font-mono break-all">
        "{searchedUrl}"
      </p>
      </div>
      

      <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        404
      </h1>

      <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
        Page not found
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The page you are trying to access doesn’t exist or may have been moved.
        Please check the URL or return to the Home.
      </p>

      <Link
        to="/"
        className="px-6 py-2.5 rounded-lg bg-blue-600 text-white 
                   hover:bg-blue-700 transition font-medium"
      >
        Go to Home
      </Link>

    </div>
  );
}