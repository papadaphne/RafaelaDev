
import React from 'react';
import { InstagramIcon } from './icons/InstagramIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
        <p className="text-sm text-gray-500">
          Powered by Rafaela Print
        </p>
        <div className="hidden sm:block border-l border-gray-700 h-4"></div>
        <a 
          href="https://www.instagram.com/rafaelaprint" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-400 transition-colors"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>@rafaelaprint</span>
        </a>
      </div>
    </footer>
  );
};
