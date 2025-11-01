
import React from 'react';
import type { ChatMessage } from '../types';

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isModel = message.role === 'model';
  const messageAlignment = isModel ? 'justify-start' : 'justify-end';
  const bubbleColor = isModel ? 'bg-gray-700' : 'bg-cyan-600';
  const bubbleClasses = `max-w-xl lg:max-w-2xl px-5 py-3 rounded-2xl shadow-md whitespace-pre-wrap`;

  const renderContent = (content: string) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(linkRegex);

    return parts.map((part, index) => {
      if (part.match(linkRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };
  
  return (
    <div className={`flex ${messageAlignment} items-start gap-3`}>
       {isModel && (
         <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
         </div>
       )}
      <div className={`${bubbleClasses} ${bubbleColor}`}>
        {renderContent(message.content)}
      </div>
    </div>
  );
};
