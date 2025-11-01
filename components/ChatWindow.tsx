
import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { Message } from './Message';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="h-full space-y-6 overflow-y-auto pr-2">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
            <div className="flex items-center gap-3 bg-gray-700 rounded-lg p-3 max-w-lg">
                <LoadingSpinner />
                <span className="text-gray-300">Pensando...</span>
            </div>
        </div>
      )}
    </div>
  );
};
