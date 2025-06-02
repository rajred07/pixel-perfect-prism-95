
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

const movieData = {
  bollywood: [
    "3 Idiots", "Dangal", "PK", "Baahubali", "Queen", "Zindagi Na Milegi Dobara", 
    "Taare Zameen Par", "My Name is Khan", "Gully Boy", "Article 15"
  ],
  hollywood: [
    "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction", 
    "Forrest Gump", "Inception", "The Matrix", "Goodfellas", "The Lord of the Rings", "Fight Club"
  ],
  anime: [
    "Your Name", "Spirited Away", "Attack on Titan", "Death Note", "One Piece", 
    "Naruto", "Dragon Ball Z", "Princess Mononoke", "Akira", "Demon Slayer"
  ]
};

export const MovieChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('new-chat');
  const [selectedMovie] = useState<string>('The Secret Garden');

  const getWelcomeMessage = (category: string): string => {
    switch (category) {
      case 'bollywood':
        return `Welcome to Bollywood movies! Here are some popular Bollywood films:\n\n${movieData.bollywood.map((movie, index) => `${index + 1}. ${movie}`).join('\n')}\n\nWhich movie would you like to know more about?`;
      case 'hollywood':
        return `Welcome to Hollywood movies! Here are some popular Hollywood films:\n\n${movieData.hollywood.map((movie, index) => `${index + 1}. ${movie}`).join('\n')}\n\nWhich movie would you like to know more about?`;
      case 'anime':
        return `Welcome to Anime/Manga! Here are some popular anime:\n\n${movieData.anime.map((movie, index) => `${index + 1}. ${movie}`).join('\n')}\n\nWhich anime would you like to know more about?`;
      case 'chat-history':
        return 'Here is your chat history. You can review your previous conversations here.';
      case 'settings':
        return 'Settings panel - Here you can customize your chat experience, change themes, and manage your preferences.';
      default:
        return 'Hello! How can I help you today?';
    }
  };

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
    
    // Create a new chat with appropriate welcome message
    const welcomeMessage = getWelcomeMessage(category);
    setMessages([{
      id: Date.now().toString(),
      message: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
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
