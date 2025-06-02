import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatHeader } from './ChatHeader';
import { ChatArea } from './ChatArea';
import { MessageInput } from './MessageInput';

interface Message {
  id: string;
  message: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

export const MovieChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      message: "Tell me about the movie 'The Secret Garden'.",
      sender: 'user',
      timestamp: new Date().toISOString()
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('new-chat');
  const [selectedMovie] = useState<string>('The Secret Garden');

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        message: `Thanks for asking about "${message}". I'd be happy to help you with information about movies!`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'new-chat') {
      setMessages([{
        id: Date.now().toString(),
        message: 'Hello! How can I help you today?',
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  return (
    <div className="flex w-full min-h-[800px] bg-[#171212] max-md:flex-col">
      <Sidebar 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      
      <div className="flex h-[760px] flex-col flex-1 max-md:h-auto">
        <ChatHeader selectedMovie={selectedMovie} />
        
        <ChatArea messages={messages} />
        
        <MessageInput 
          onSendMessage={handleSendMessage}
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};
