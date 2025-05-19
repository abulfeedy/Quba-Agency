import React from 'react';

const PageNotFound = () => { 
  return ( 
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-700 text-purple-300"> 
      <img src="/cube.svg" alt="Cube Icon" className="w-16 h-16 mb-4 animate-spin" /> 
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Page <span className="text-white">Not Found</span></h1> 
    </div> 
  ); 
};

export default PageNotFound;

