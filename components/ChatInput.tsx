import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  quickReplies?: string[];
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, quickReplies = [] }) => {
  const [input, setInput] = useState('');

  const handleQuickReplyClick = (reply: string) => {
    if (!isLoading) {
      onSendMessage(reply);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="container mx-auto">
      {quickReplies.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReplyClick(reply)}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-sm text-gray-200 hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
            >
              {reply}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-stretch gap-3">
        <form onSubmit={handleSubmit} className="flex-1 flex items-center bg-gray-700 rounded-full p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta aquí..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 px-4 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-200"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
                transform="rotate(90 12 12)"
              />
            </svg>
          </button>
        </form>
        <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf27ngs-AQ-BzBdWUsP8cDsDTYt18wEwXxA00k7gwkl0mPj_w/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 rounded-full text-white font-semibold transition-colors duration-200 text-sm"
            aria-label="Inscribirse ahora"
        >
          Inscríbete
        </a>
      </div>
    </div>
  );
};