
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { PromptOutput } from './components/PromptOutput';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { ExamplePrompts } from './components/ExamplePrompts';
import { generateAppPromptStream } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const stream = generateAppPromptStream(userInput);
      for await (const chunk of stream) {
        setGeneratedPrompt((prev) => prev + chunk);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate prompt. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading]);
  
  const handleSelectExample = (prompt: string) => {
    setUserInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <p className="text-center text-lg text-gray-400 mb-8">
            Describe your application idea, and we'll engineer a detailed, structured prompt ready for development.
          </p>
          <PromptInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <ExamplePrompts onSelect={handleSelectExample} disabled={isLoading} />
          {isLoading && !generatedPrompt && <Loader />}
          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
          {generatedPrompt && (
            <PromptOutput content={generatedPrompt} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;