
import React, { useState, KeyboardEvent } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { SuggestionPills } from './SuggestionPills';

interface MessageInputProps {
  onSendMessage: (message: string, sender: 'user' | 'bot') => void;
  placeholder?: string;
  selectedCategory: string;
  selectedMovie: string;
}

const thinkingMessages = [
  "🤖 Savyy is thinking about the perfect reply for you...",
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

const quickMessages = [
  "🍿 Just a sec! Savyy is searching her movie memory...",
  "🎬 Savyy is queuing up a great answer...",
  "✨ Savyy is crafting a cinematic reply just for you...",
  "💡 Idea loading… Savyy's script is almost ready!"
];

const slowMessages = [
  "🍫 This one's taking a bit… grabbing popcorn!",
  "📼 Rewinding memories… Savyy's almost there!",
  "🎭 Savyy is acting out all the possibilities in her head...",
  "🧠 Deep thinking mode activated... Savyy's really pondering this one!"
];

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = "Type your message here...",
  selectedCategory,
  selectedMovie
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentThinkingMessage, setCurrentThinkingMessage] = useState('');

  const getRandomMessage = (isSlowResponse = false) => {
    const messageArray = isSlowResponse ? slowMessages : quickMessages;
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  };

  const getBotResponse = (userMessage: string): string => {
    if (selectedMovie) {
      return `Thanks for asking about "${userMessage}". Since we're discussing "${selectedMovie}", I can provide specific information about this ${selectedCategory} title. How can I help you learn more about it?`;
    } else {
      return `Thanks for asking about "${userMessage}". Please select a movie from the sidebar first so I can provide specific information about it.`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      // Send user message immediately
      onSendMessage(message.trim(), 'user');
      setMessage('');
      
      // Start thinking state
      setIsThinking(true);
      const startTime = Date.now();
      setCurrentThinkingMessage(getRandomMessage(false));
      
      // Check if response is taking longer than 1 minute
      const slowResponseTimer = setTimeout(() => {
        if (isThinking) {
          setCurrentThinkingMessage(getRandomMessage(true));
        }
      }, 60000); // 1 minute
      
      // Simulate bot response delay
      setTimeout(() => {
        const responseTime = Date.now() - startTime;
        setIsThinking(false);
        clearTimeout(slowResponseTimer);
        
        const botResponse = getBotResponse(message.trim());
        onSendMessage(botResponse, 'bot');
      }, Math.random() * 2000 + 1000); // 1-3 seconds delay
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="border-t border-gray-300 dark:border-[#362B2B] bg-white dark:bg-[#171212] p-4 font-poppins">
      <SuggestionPills onSuggestionClick={handleSuggestionClick} />
      
      {/* Thinking indicator */}
      {isThinking && (
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="italic">{currentThinkingMessage}</span>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isThinking}
            className="w-full px-4 py-3 border border-gray-300 dark:border-[#362B2B] rounded-xl bg-white dark:bg-[#171212] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <button
          onClick={isListening ? stopListening : startListening}
          className="p-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-[#362B2B] rounded-xl transition-colors"
          title={isListening ? "Stop listening" : "Start voice input"}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        
        <button
          onClick={handleSend}
          disabled={!message.trim() || isThinking}
          className="p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
