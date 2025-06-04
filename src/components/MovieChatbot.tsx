import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatHeader } from './ChatHeader';
import { ChatArea } from './ChatArea';
import { MessageInput } from './MessageInput';
import { TopNavigation } from './TopNavigation';
import { ChatHistoryView } from './ChatHistoryView';
import { useMovies } from '../hooks/useMovies';
import { useChatHistory } from '../hooks/useChatHistory';

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
  japaneseTitle?: string;
  episodes?: string;
  genres?: string;
  popularity?: string;
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

const categoryLabels = {
  bollywood: 'Bollywood',
  hollywood: 'Hollywood',
  anime: 'Anime',
  dramas: 'K-Drama',
  kmovies: 'K-Movies',
  manga: 'Manga'
};

export const MovieChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: 'Hello! How can I help you today? Select a category from the top navigation and choose a movie to get started.',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('new-chat');
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  // Add chat history hook
  const { chatHistory, saveChatSession } = useChatHistory();

  // Use the Firebase hook for all categories now
  const { movies: firebaseMovies, loading, error } = useMovies(selectedTopCategory);

  const getWelcomeMessage = (category: string): string => {
    switch (category) {
      case 'bollywood':
        return `Welcome to Bollywood movies! Here are some popular Bollywood films. Please select a movie from the sidebar to get started with your questions.`;
      case 'hollywood':
        return `Welcome to Hollywood movies! Here are some popular Hollywood films. Please select a movie from the sidebar to get started with your questions.`;
      case 'anime':
        return `Welcome to Anime! Here are some popular anime titles. Please select one from the sidebar to get started with your questions.`;
      case 'dramas':
        return `Welcome to K-Drama! Here are some popular Korean drama series. Please select one from the sidebar to get started with your questions.`;
      case 'kmovies':
        return `Welcome to K-Movies! Here are some popular Korean films. Please select a movie from the sidebar to get started with your questions.`;
      case 'manga':
        return `Welcome to Manga! Here are some popular manga titles. Please select one from the sidebar to get started with your questions.`;
      case 'chat-history':
        return 'Here is your chat history. You can review your previous conversations here.';
      case 'settings':
        return 'Settings panel - Here you can customize your chat experience, change themes, and manage your preferences.';
      default:
        return 'Hello! How can I help you today? Select a category from the top navigation and choose a movie to get started.';
    }
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      
      // Save chat session when user sends a message (with bot response)
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          message: getBotResponse(message),
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        
        setMessages(current => {
          const finalMessages = [...current, botResponse];
          
          // Save to Firebase if user is authenticated and has more than just welcome message
          if (finalMessages.length > 2) {
            if (selectedMovie) {
              saveChatSession(finalMessages, `Chat about ${selectedMovie}`);
            } else if (selectedTopCategory) {
              saveChatSession(finalMessages, `${selectedTopCategory.charAt(0).toUpperCase() + selectedTopCategory.slice(1)} Chat`);
            } else {
              saveChatSession(finalMessages, `General Chat - ${new Date().toLocaleDateString()}`);
            }
          }
          
          return finalMessages;
        });
      }, 1000);
      
      return updatedMessages;
    });
  };

  const getBotResponse = (userMessage: string): string => {
    if (selectedMovie) {
      return `Thanks for asking about "${userMessage}". Since we're discussing "${selectedMovie}", I can provide specific information about this ${selectedTopCategory} title. How can I help you learn more about it?`;
    } else {
      return `Thanks for asking about "${userMessage}". Please select a movie from the sidebar first so I can provide specific information about it.`;
    }
  };

  const handleSidebarCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedTopCategory('');
    setSelectedMovie(null);
    
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
      message: `Great choice! I've set "${movie.title}" as our current discussion topic. Feel free to ask me anything about this ${categoryLabels[selectedTopCategory as keyof typeof categoryLabels]} title - plot, characters, reviews, or any other questions you might have!`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, movieMessage]);
  };

  const handleSettingsClick = () => {
    setSelectedCategory('settings');
    setSelectedTopCategory('');
    setSelectedMovie(null);
    
    const welcomeMessage = getWelcomeMessage('settings');
    setMessages([{
      id: Date.now().toString(),
      message: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  };

  const getCurrentMovies = (): Movie[] => {
    // For all categories, try Firebase first, fallback to static data
    if (selectedTopCategory && ['bollywood', 'hollywood', 'anime', 'dramas', 'kmovies', 'manga'].includes(selectedTopCategory)) {
      if (firebaseMovies.length > 0) {
        return firebaseMovies;
      }
      // Fallback to static data if Firebase is empty (only for existing categories)
      if (movieData[selectedTopCategory as keyof typeof movieData]) {
        return movieData[selectedTopCategory as keyof typeof movieData] || [];
      }
    }
    return [];
  };

  const getCurrentCategoryLabel = (): string => {
    return categoryLabels[selectedTopCategory as keyof typeof categoryLabels] || '';
  };

  const renderMainContent = () => {
    if (selectedCategory === 'chat-history') {
      return <ChatHistoryView />;
    }
    
    return <ChatArea messages={messages} />;
  };

  return (
    <div className="flex w-full h-screen bg-white dark:bg-[#171212] max-w-7xl mx-auto">
      <Sidebar 
        onCategorySelect={handleSidebarCategorySelect}
        selectedCategory={selectedCategory}
        movies={getCurrentMovies()}
        selectedMovie={selectedMovie}
        onMovieSelect={handleMovieSelect}
        currentCategoryLabel={selectedTopCategory ? getCurrentCategoryLabel() : ''}
        loading={['bollywood', 'hollywood', 'anime', 'dramas', 'kmovies', 'manga'].includes(selectedTopCategory) ? loading : false}
        error={['bollywood', 'hollywood', 'anime', 'dramas', 'kmovies', 'manga'].includes(selectedTopCategory) ? error : null}
      />
      
      <div className="flex h-full flex-col flex-1 min-w-0">
        <ChatHeader 
          selectedMovie={selectedMovie}
          onSettingsClick={handleSettingsClick}
        />
        
        {/* Hide TopNavigation when viewing chat history */}
        {selectedCategory !== 'chat-history' && (
          <TopNavigation 
            selectedCategory={selectedTopCategory}
            onCategorySelect={handleTopCategorySelect}
          />
        )}
        
        <div className="flex-1 overflow-hidden min-h-0">
          {renderMainContent()}
        </div>
        
        {selectedCategory !== 'chat-history' && (
          <MessageInput 
            onSendMessage={handleSendMessage}
            placeholder="Type your message here..."
          />
        )}
      </div>
    </div>
  );
};
