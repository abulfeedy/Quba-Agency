import React from 'react';

const PageNotFound = () => { 
  return ( 
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700 text-purple-300"> 
      <img src="/cube.svg" alt="Cube Icon" className="w-16 h-16 mb-4 animate-spin" /> 
      <h1 className="text-xl font-semibold">
        <span className="text-white">Page</span>Not Found</h1> 
    </div> 
  ); 
};

export default PageNotFound;

