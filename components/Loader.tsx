
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 text-center">
        <div className="relative h-16 w-16">
            <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-purple-500 border-l-transparent animate-spin"></div>
            <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-gray-700 border-r-gray-700 border-b-gray-700 border-l-transparent opacity-20"></div>
        </div>
        <p className="mt-4 text-purple-300 font-medium animate-pulse">Engineering your prompt...</p>
    </div>
  );
};
