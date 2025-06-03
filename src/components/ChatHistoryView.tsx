
import React from 'react';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: any;
  updatedAt: any;
  title: string;
}

export const ChatHistoryView: React.FC = () => {
  const { user } = useAuth();
  const { chatHistory, loading, error } = useChatHistory();

  if (!user || user.uid === 'demo-user-123') {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-400">
        <p className="text-lg mb-2">Please sign in to view your chat history</p>
        <p className="text-sm">Your conversations will be saved and accessible here once you're logged in.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
        <span className="ml-2 text-black dark:text-white">Loading chat history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        Error loading chat history: {error}
      </div>
    );
  }

  if (chatHistory.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-400">
        <p className="text-lg mb-2">No chat history found</p>
        <p className="text-sm">Start a conversation to see your chat history here.</p>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-black dark:text-white mb-4">Your Chat History</h2>
      
      {chatHistory.map((session: ChatSession) => (
        <div 
          key={session.id} 
          className="bg-gray-100 dark:bg-[#362B2B] rounded-lg p-4 border border-gray-200 dark:border-[#362B2B]"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-black dark:text-white">{session.title}</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(session.createdAt)}
            </span>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {session.messages.slice(0, 5).map((message: ChatMessage) => (
              <div 
                key={message.id}
                className={`p-2 rounded text-sm ${
                  message.sender === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-black dark:text-white ml-4' 
                    : 'bg-gray-50 dark:bg-gray-700 text-black dark:text-white mr-4'
                }`}
              >
                <div className="font-medium text-xs mb-1 text-gray-600 dark:text-gray-400">
                  {message.sender === 'user' ? 'You' : 'Bot'}
                </div>
                <div>{message.message.length > 100 ? message.message.substring(0, 100) + '...' : message.message}</div>
              </div>
            ))}
            
            {session.messages.length > 5 && (
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2">
                ... and {session.messages.length - 5} more messages
              </div>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Total messages: {session.messages.length}
          </div>
        </div>
      ))}
    </div>
  );
};
