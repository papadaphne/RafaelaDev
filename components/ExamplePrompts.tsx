
import React from 'react';

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

const examples = [
  "AI-powered recipe app from pantry ingredients",
  "Gamified language learning platform for kids",
  "Task management tool with focus timer",
  "Personal finance tracker with smart categorization"
];

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <p className="text-sm text-gray-500 mr-2">Try an example:</p>
      {examples.map((example, index) => (
        <button
          key={index}
          onClick={() => onSelect(example)}
          disabled={disabled}
          className="px-3 py-1 bg-gray-700/50 text-xs text-gray-300 font-medium rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {example}
        </button>
      ))}
    </div>
  );
};
