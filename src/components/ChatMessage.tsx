
import React from 'react';
import { SavyAvatar } from './SavyAvatar';

interface ChatMessageProps {
  message: string;
  sender: 'bot' | 'user';
  senderName?: string;
  timestamp?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  senderName,
  timestamp
}) => {
  const isBot = sender === 'bot';
  
  return (
    <div className={`flex items-end gap-2 sm:gap-3 p-3 sm:p-4 font-poppins w-full ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0">
          <SavyAvatar />
        </div>
      )}
      
      <div className={`flex flex-col gap-1 flex-1 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${isBot ? '' : 'items-end'}`}>
        <div className={`text-gray-500 dark:text-gray-400 text-xs font-medium ${isBot ? '' : 'text-right'}`}>
          {senderName || (isBot ? 'Savy' : 'You')}
        </div>
        <div className={`text-sm font-normal leading-relaxed px-3 sm:px-4 py-2 sm:py-3 break-words ${
          isBot 
            ? 'text-gray-800 dark:text-white bg-gradient-to-br from-purple-50/80 via-blue-50/80 to-purple-50/80 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-2xl rounded-bl-sm shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20' 
            : 'text-gray-800 dark:text-white bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl rounded-br-sm shadow-md'
        }`}>
          {message}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="User avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
          />
        </div>
      )}
    </div>
  );
};
