import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SuggestionPills } from './SuggestionPills';

interface MessageInputProps {
  onSendMessage: (message: string, sender: 'user' | 'bot') => void;
  placeholder?: string;
  selectedCategory: string;
  selectedMovie: string;
}

const THINKING_MESSAGES = {
  quick: [
    "🍿 Just a sec! Savyy is searching her movie memory...",
    "🎬 Savyy is queuing up a great answer...",
    "✨ Savyy is crafting a cinematic reply just for you...",
    "🎞️ Savyy's flipping through film reels in her mind...",
    "🎥 One moment! Savyy is rolling the perfect scene...",
    "👀 Savyy is watching all the movies in fast-forward...",
    "📚 Savyy is browsing her mental movie library...",
    "🌟 Hold tight! Savyy is picking a 5-star answer...",
  ],
  slow: [
    "Savyy is thinking about the perfect reply for you...",
    "🧠 Hmm... Savyy is having a movie moment...",
    "💖 Savyy's cooking up something sweet for you...",
    "📽️ Savyy paused the tape — thinking deeply...",
    "🕵️‍♀️ Savyy is investigating behind the scenes...",
    "🎭 Savyy is acting out the possibilities in her head...",
    "📼 Rewinding memories… Savyy's almost there!",
    "🍫 Like a good movie snack, Savyy's answer is loading...",
    "🛋️ Savyy's settling into the couch to think with you...",
    "🎧 Savyy's humming a soundtrack while thinking...",
    "🧸 Savyy's hugging a film reel and thinking deeply...",
    "📀 Savyy's burning the perfect answer onto a DVD...",
    "💡 Idea loading… Savyy's script is almost ready!",
    "⏳ A tiny moment — Savyy's rolling the credits of thoughts...",
  ],
  error: [
    "🎬 Plot twist! Something went wrong, but Savyy's fixing it...",
    "📽️ Technical difficulties! Savyy's adjusting the projector...",
    "🎞️ Film got tangled! Savyy's untangling the situation...",
    "🎭 Intermission! Savyy's working behind the scenes...",
  ]
};

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = 'Type your message here...',
  selectedCategory,
  selectedMovie,
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');
  const recognition = useRef<SpeechRecognition | null>(null);
  const thinkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (thinkingTimeoutRef.current) {
        clearTimeout(thinkingTimeoutRef.current);
      }
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const getRandomThinkingMessage = (type: 'quick' | 'slow' | 'error') => {
    const messages = THINKING_MESSAGES[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const showThinkingMessage = () => {
    setIsThinking(true);
    setThinkingMessage(getRandomThinkingMessage('quick'));

    // Switch to slower message after 1 minute
    thinkingTimeoutRef.current = setTimeout(() => {
      setThinkingMessage(getRandomThinkingMessage('slow'));
    }, 60000);

    // Cycle through different messages every 10 seconds
    const cycleThroughMessages = () => {
      messageTimeoutRef.current = setTimeout(() => {
        setThinkingMessage(getRandomThinkingMessage('quick'));
        cycleThroughMessages();
      }, 10000);
    };
    cycleThroughMessages();
  };

  const hideThinkingMessage = () => {
    setIsThinking(false);
    setThinkingMessage('');
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
    }
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');

    // Send user message immediately
    onSendMessage(userMessage, 'user');

    // Show thinking message
    showThinkingMessage();

    try {
      // Simulate bot response delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      // Generate bot response
      const botResponse = getBotResponse(userMessage);
      
      // Hide thinking message and send bot response
      hideThinkingMessage();
      onSendMessage(botResponse, 'bot');
    } catch (error) {
      // Show error thinking message briefly
      setThinkingMessage(getRandomThinkingMessage('error'));
      setTimeout(() => {
        hideThinkingMessage();
        onSendMessage("I'm having trouble processing that right now. Could you try again?", 'bot');
      }, 2000);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    if (selectedMovie) {
      return `Thanks for asking about "${userMessage}". Since we're discussing "${selectedMovie}", I can provide specific information about this ${selectedCategory} title. How can I help you learn more about it?`;
    } else {
      return `Thanks for asking about "${userMessage}". Please select a movie from the sidebar first so I can provide specific information about it.`;
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      recognition.current?.start();
      setIsListening(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Thinking Message Display */}
      {isThinking && (
        <div className="mb-3 flex items-center justify-center">
          <div className="flex items-center space-x-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground animate-pulse">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="font-medium">{thinkingMessage}</span>
          </div>
        </div>
      )}

      <SuggestionPills
        selectedCategory={selectedCategory}
        selectedMovie={selectedMovie}
        onSuggestionClick={handleSuggestionClick}
      />
      
      <form onSubmit={handleSubmit} className="flex space-x-2 mt-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          disabled={isThinking}
        />
        
        {recognition.current && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={isListening ? 'bg-red-500 text-white' : ''}
            disabled={isThinking}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        )}
        
        <Button type="submit" size="icon" disabled={!message.trim() || isThinking}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
