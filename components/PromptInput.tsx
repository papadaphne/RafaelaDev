
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      onSubmit();
    }
  };
    
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-purple-500 transition-shadow shadow-lg">
        <textarea
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="e.g., A mobile app that uses the camera to identify plants and provides care instructions."
            className="w-full h-32 p-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
            disabled={isLoading}
        />
        <div className="flex justify-between items-center p-2 border-t border-gray-700">
            <p className="text-xs text-gray-500">Press Cmd/Ctrl + Enter to submit</p>
            <button
                onClick={onSubmit}
                disabled={isLoading || !value.trim()}
                className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
                {isLoading ? 'Generating...' : 'Engineer Prompt'}
                {!isLoading && <SparklesIcon />}
            </button>
        </div>
    </div>
  );
};
