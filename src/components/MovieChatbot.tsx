
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatHeader } from './ChatHeader';
import { ChatArea } from './ChatArea';
import { MessageInput } from './MessageInput';
import { TopNavigation } from './TopNavigation';
import { MovieSection } from './MovieSection';

interface Message {
  id: string;
  message: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

interface Movie {
  id: string;
  title: string;
  year?: string;
  poster?: string;
}

const movieData = {
  bollywood: [
    { id: '1', title: '3 Idiots', year: '2009' },
    { id: '2', title: 'Dangal', year: '2016' },
    { id: '3', title: 'PK', year: '2014' },
    { id: '4', title: 'Baahubali', year: '2015' },
    { id: '5', title: 'Queen', year: '2013' },
    { id: '6', title: 'Zindagi Na Milegi Dobara', year: '2011' },
    { id: '7', title: 'Taare Zameen Par', year: '2007' },
    { id: '8', title: 'My Name is Khan', year: '2010' },
    { id: '9', title: 'Gully Boy', year: '2019' },
    { id: '10', title: 'Article 15', year: '2019' }
  ],
  hollywood: [
    { id: '1', title: 'The Shawshank Redemption', year: '1994' },
    { id: '2', title: 'The Godfather', year: '1972' },
    { id: '3', title: 'The Dark Knight', year: '2008' },
    { id: '4', title: 'Pulp Fiction', year: '1994' },
    { id: '5', title: 'Forrest Gump', year: '1994' },
    { id: '6', title: 'Inception', year: '2010' },
    { id: '7', title: 'The Matrix', year: '1999' },
    { id: '8', title: 'Goodfellas', year: '1990' },
    { id: '9', title: 'The Lord of the Rings', year: '2001' },
    { id: '10', title: 'Fight Club', year: '1999' }
  ],
  anime: [
    { id: '1', title: 'Your Name', year: '2016' },
    { id: '2', title: 'Spirited Away', year: '2001' },
    { id: '3', title: 'Attack on Titan', year: '2013' },
    { id: '4', title: 'Death Note', year: '2006' },
    { id: '5', title: 'One Piece', year: '1999' },
    { id: '6', title: 'Naruto', year: '2002' },
    { id: '7', title: 'Dragon Ball Z', year: '1989' },
    { id: '8', title: 'Princess Mononoke', year: '1997' },
    { id: '9', title: 'Akira', year: '1988' },
    { id: '10', title: 'Demon Slayer', year: '2019' }
  ],
  dramas: [
    { id: '1', title: 'Breaking Bad', year: '2008' },
    { id: '2', title: 'Game of Thrones', year: '2011' },
    { id: '3', title: 'The Crown', year: '2016' },
    { id: '4', title: 'Stranger Things', year: '2016' },
    { id: '5', title: 'The Office', year: '2005' },
    { id: '6', title: 'Friends', year: '1994' },
    { id: '7', title: 'Sherlock', year: '2010' },
    { id: '8', title: 'House of Cards', year: '2013' },
    { id: '9', title: 'Westworld', year: '2016' },
    { id: '10', title: 'The Sopranos', year: '1999' }
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
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [showMovieSection, setShowMovieSection] = useState<boolean>(false);

  const getWelcomeMessage = (category: string): string => {
    switch (category) {
      case 'bollywood':
        return `Welcome to Bollywood movies! Here are some popular Bollywood films:\n\n${movieData.bollywood.map((movie, index) => `${index + 1}. ${movie.title} (${movie.year})`).join('\n')}\n\nWhich movie would you like to know more about?`;
      case 'hollywood':
        return `Welcome to Hollywood movies! Here are some popular Hollywood films:\n\n${movieData.hollywood.map((movie, index) => `${index + 1}. ${movie.title} (${movie.year})`).join('\n')}\n\nWhich movie would you like to know more about?`;
      case 'anime':
        return `Welcome to Anime/Manga! Here are some popular anime:\n\n${movieData.anime.map((movie, index) => `${index + 1}. ${movie.title} (${movie.year})`).join('\n')}\n\nWhich anime would you like to know more about?`;
      case 'dramas':
        return `Welcome to Dramas! Here are some popular TV dramas:\n\n${movieData.dramas.map((movie, index) => `${index + 1}. ${movie.title} (${movie.year})`).join('\n')}\n\nWhich drama would you like to know more about?`;
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

    // Simulate bot response with movie context
    setTimeout(() => {
      let response = `Thanks for asking about "${message}". I'd be happy to help you with information about movies!`;
      
      if (selectedMovie) {
        response = `Thanks for asking about "${message}". Since we're discussing "${selectedMovie}", I can provide specific information about this ${selectedTopCategory} title. How can I help you learn more about it?`;
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        message: response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSidebarCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowMovieSection(false);
    setSelectedTopCategory('');
    
    // Create a new chat with appropriate welcome message
    const welcomeMessage = getWelcomeMessage(category);
    setMessages([{
      id: Date.now().toString(),
      message: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  };

  const handleTopCategorySelect = (category: string) => {
    setSelectedTopCategory(category);
    setShowMovieSection(true);
    setSelectedMovie(null);
    
    // Create a new chat with category-specific welcome message
    const welcomeMessage = getWelcomeMessage(category);
    setMessages([{
      id: Date.now().toString(),
      message: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie.title);
    
    // Send a message about the selected movie
    const movieMessage: Message = {
      id: Date.now().toString(),
      message: `Great choice! I've set "${movie.title}" as our current discussion topic. Feel free to ask me anything about this ${selectedTopCategory} title - plot, characters, reviews, or any other questions you might have!`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, movieMessage]);
  };

  const getCurrentMovies = (): Movie[] => {
    return movieData[selectedTopCategory as keyof typeof movieData] || [];
  };

  return (
    <div className="flex w-full min-h-[800px] bg-[#171212] max-md:flex-col">
      <Sidebar 
        onCategorySelect={handleSidebarCategorySelect}
        selectedCategory={selectedCategory}
      />
      
      <div className="flex h-[800px] flex-col flex-1 max-md:h-auto">
        <ChatHeader selectedMovie={selectedMovie} />
        
        <TopNavigation 
          selectedCategory={selectedTopCategory}
          onCategorySelect={handleTopCategorySelect}
        />
        
        <MovieSection
          category={selectedTopCategory}
          movies={getCurrentMovies()}
          selectedMovie={selectedMovie}
          onMovieSelect={handleMovieSelect}
          isVisible={showMovieSection}
        />
        
        <ChatArea messages={messages} />
        
        <MessageInput 
          onSendMessage={handleSendMessage}
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};
