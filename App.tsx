
import React, { useState, useEffect, useCallback } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { Schedule } from './components/Schedule';
import { ai } from './services/geminiService';
import { INITIAL_GREETING, QUICK_REPLIES, SYSTEM_PROMPT } from './constants';
import type { ChatMessage } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState<boolean>(true);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        content: INITIAL_GREETING,
      },
    ]);
    setIsLoading(false);
  }, []);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (isLoading) return;

    if (showQuickReplies) {
      setShowQuickReplies(false);
    }

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = { role: 'user', content: userInput };
    const placeholderMessage: ChatMessage = { role: 'model', content: '' };
    
    const messagesForHistory = [...messages, userMessage];
    setMessages([...messagesForHistory, placeholderMessage]);

    const history = messagesForHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    try {
      const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: history,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      let modelResponse = '';
      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelResponse;
          return newMessages;
        });
      }

    } catch (e: any) {
      console.error("Error sending message:", e);
      const errorMessage = "Sorry, something went wrong. Please try again.";
      setError(errorMessage);
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'model') {
          newMessages[newMessages.length - 1].content = errorMessage;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, showQuickReplies]);

  return (
    <div 
      className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.95)), url('https://images.unsplash.com/photo-1557616232-9ab2c40c5b4b?q=80&w=1470&auto=format&fit=crop')"
      }}
    >
      <header className="bg-gray-800/70 backdrop-blur-sm shadow-lg p-4 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <h1 className="text-xl font-bold tracking-wider text-white">
              Kallpa Triatlón AI Assistant
            </h1>
          </div>
          <a
            href="https://www.instagram.com/kallpa_triatlon/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kallpa Triatlón Instagram"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44c-3.116 0-3.483.01-4.703.066-2.825.128-4.141 1.44-4.269 4.269-.056 1.22-.066 1.585-.066 4.702 0 3.116.01 3.483.066 4.703.128 2.825 1.44 4.141 4.269 4.269 1.22.056 1.585.066 4.703.066s3.483-.01 4.702-.066c2.825-.128 4.141-1.44 4.269-4.269.056-1.22.066-1.585.066-4.702 0-3.116-.01-3.483-.066-4.703-.128-2.825-1.44-4.141-4.269-4.269-1.22-.056-1.585-.066-4.702-.066zm0 2.88a5.517 5.517 0 100 11.034 5.517 5.517 0 000-11.034zm0 1.44a4.077 4.077 0 110 8.154 4.077 4.077 0 010-8.154zm6.406-3.3a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"></path>
            </svg>
          </a>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4">
          <Schedule />
          <main className="pb-4 md:pb-6">
            <ChatWindow messages={messages} isLoading={isLoading && messages[messages.length - 1]?.role === 'user'} />
            {error && <div className="text-red-400 text-center p-2">{error}</div>}
          </main>
        </div>
      </div>

      <footer className="bg-gray-800/70 backdrop-blur-sm p-4 border-t border-gray-700/50 z-10">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          quickReplies={showQuickReplies ? QUICK_REPLIES : []}
        />
      </footer>
    </div>
  );
};

export default App;
