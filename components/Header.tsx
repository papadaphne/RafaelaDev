import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
                RafaelaDev <span className="text-purple-400">Prompt Engineer</span>
            </h1>
            <p className="text-sm text-gray-400">Your AI-Powered Software Architect</p>
        </div>
      </div>
    </header>
  );
};