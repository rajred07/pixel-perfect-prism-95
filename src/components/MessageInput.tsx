
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string, sender: 'user' | 'bot') => void;
  placeholder?: string;
  selectedCategory: string;
  selectedMovie: string;
}

const THINKING_MESSAGES = [
  "🍿 Just a sec! Savyy is searching her movie memory...",
  "🎬 Savyy is queuing up a great answer...",
  "🧠 Hmm... Savyy is having a movie moment...",
  "💖 Savyy's cooking up something sweet for you...",
  "🎞️ Savyy's flipping through film reels in her mind...",
  "🎥 One moment! Savyy is rolling the perfect scene...",
  "✨ Savyy is crafting a cinematic reply just for you...",
  "📽️ Savyy paused the tape — thinking deeply...",
  "👀 Savyy is watching all the movies in fast-forward...",
  "📚 Savyy is browsing her mental movie library...",
  "🌟 Hold tight! Savyy is picking a 5-star answer...",
  "🕵️‍♀️ Savyy is investigating behind the scenes...",
  "🎭 Savyy is acting out the possibilities in her head...",
  "📼 Rewinding memories… Savyy's almost there!",
  "🍫 Like a good movie snack, Savyy's answer is loading...",
  "🛋️ Savyy's settling into the couch to think with you...",
  "🎧 Savyy's humming a soundtrack while thinking...",
  "🧸 Savyy's hugging a film reel and thinking deeply...",
  "📀 Savyy's burning the perfect answer onto a DVD...",
  "💡 Idea loading… Savyy's script is almost ready!",
  "⏳ A tiny moment — Savyy's rolling the credits of her thoughts..."
];

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = 'Type your message here...',
  selectedCategory,
  selectedMovie,
}) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentThinkingMessage, setCurrentThinkingMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    onSendMessage(userMessage, 'user');
    
    // Start loading with random thinking message
    setIsLoading(true);
    const randomMessage = THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)];
    setCurrentThinkingMessage(randomMessage);

    try {
      // Call your backend API
      const response = await fetch('http://localhost:8001/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          top_k: 5, // Default values, can be made configurable
          max_new_tokens: 500,
          temperature: 0.7,
          top_k_sampling: 50
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Add bot response
      onSendMessage(result.response, 'bot');
      
    } catch (error) {
      console.error('Error calling backend:', error);
      
      // Fallback error message
      const errorMessage = "Sorry, there was an error processing your request. Please make sure the backend server is running on http://localhost:8001 and try again.";
      onSendMessage(errorMessage, 'bot');
    } finally {
      setIsLoading(false);
      setCurrentThinkingMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#171212] p-2 sm:p-4">
      {/* Thinking indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-3 px-2 animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{currentThinkingMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full text-sm sm:text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          size="sm"
          className="shrink-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};
