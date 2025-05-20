import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-slate-700 text-purple-300'>
      <img
        src='/cube.svg'
        alt='Cube Icon'
        className='w-16 h-16 mb-4 animate-spin'
      />
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        Page <span className='text-white'>Not Found</span>
      </h1>
      <Link
        to='/'
        className='bg-purple-300 text-gray-800 hover:bg-purple-400 mt-10 hover:text-white px-6 py-2 sm:py-3 rounded-md font-semibold'>
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
