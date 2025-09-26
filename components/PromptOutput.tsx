import React, { useState, useEffect, useRef } from 'react';

declare global {
    interface Window {
        marked: any;
        hljs: any;
    }
}

interface PromptOutputProps {
  content: string;
}

const clipboardIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>`;
const checkIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>`;
const downloadIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`;


export const PromptOutput: React.FC<PromptOutputProps> = ({ content }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [isAllCopied, setIsAllCopied] = useState<boolean>(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsAllCopied(true);
      setTimeout(() => {
        setIsAllCopied(false);
      }, 2000);
    });
  };
  
  const handleDownload = () => {
    // Extract the app name from the markdown title to use in the filename
    const titleMatch = content.match(/^# RafaelaDev Prompt: (.*)/m);
    const appName = titleMatch ? titleMatch[1].trim() : 'engineered-prompt';
    const fileName = `${appName.toLowerCase().replace(/\s+/g, '-')}.md`;

    // Create a blob and trigger a download
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  useEffect(() => {
    if (outputRef.current) {
        // After content is rendered, find all pre blocks and manage their copy buttons
        const codeBlocks = outputRef.current.querySelectorAll('pre');
        codeBlocks.forEach((block, index) => {
            // FIX: Use type assertion instead of a generic type argument for querySelector to resolve a potential TypeScript typing issue.
            let wrapper = block.querySelector('.copy-button-wrapper') as HTMLDivElement | null;

            // If the wrapper for the button doesn't exist, create it
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.className = 'copy-button-wrapper absolute top-2 right-2';
                
                const button = document.createElement('button');
                button.className = 'px-2 py-1 bg-gray-600/50 text-xs text-gray-300 font-medium rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all flex items-center gap-1.5';
                
                button.onclick = (e) => {
                    e.stopPropagation();
                    const code = block.querySelector('code')?.innerText || '';
                    handleCopy(code, index);
                };

                wrapper.appendChild(button);
                block.appendChild(wrapper);
            }

            // Update the button's state (icon and text)
            const button = wrapper.querySelector('button');
            if (button) {
                const isCopied = !!copiedStates[index];
                if (isCopied) {
                    button.innerHTML = `${checkIconSVG} <span>Copied!</span>`;
                } else {
                    button.innerHTML = `${clipboardIconSVG} <span>Copy</span>`;
                }
            }
        });

        // Highlight all code blocks after buttons are set up
        if (typeof window.hljs?.highlightAll === 'function') {
            window.hljs.highlightAll();
        }
    }
  }, [content, copiedStates]);

  const getHtmlContent = () => {
      if (typeof window.marked?.parse !== 'function') {
          // Fallback for when marked is not loaded yet, escaping HTML
          return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return window.marked.parse(content);
  }

  return (
    <div className="mt-8 bg-gray-800/60 border border-gray-700 rounded-xl shadow-2xl relative overflow-hidden">
      <div className="px-6 py-4 bg-gray-900/70 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Engineered Prompt</h3>
        <div className="flex items-center gap-2">
            <button
                onClick={handleDownload}
                className="px-2 py-1 bg-gray-600/50 text-xs text-gray-300 font-medium rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all flex items-center gap-1.5"
            >
                <span dangerouslySetInnerHTML={{ __html: downloadIconSVG }} />
                <span>Download .md</span>
            </button>
            <button
                onClick={handleCopyAll}
                className="px-2 py-1 bg-gray-600/50 text-xs text-gray-300 font-medium rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all flex items-center gap-1.5"
            >
                {isAllCopied ? (
                    <>
                        <span dangerouslySetInnerHTML={{ __html: checkIconSVG }} />
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <span dangerouslySetInnerHTML={{ __html: clipboardIconSVG }} />
                        <span>Copy All</span>
                    </>
                )}
            </button>
        </div>
      </div>
      <div 
        ref={outputRef}
        className="p-6 prose prose-invert max-w-none text-gray-300 leading-relaxed prose-headings:text-purple-400 prose-h1:text-purple-300 prose-h1:text-3xl prose-strong:text-gray-100 break-words"
        dangerouslySetInnerHTML={{ __html: getHtmlContent() }} 
      />
    </div>
  );
};
