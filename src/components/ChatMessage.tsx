import React from 'react';

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
    <div className={`flex items-end gap-3 p-4 max-sm:p-3 ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=40&h=40&fit=crop&crop=face"
          alt="Bot avatar"
          className="w-[40px] h-[40px] rounded-[20px]"
        />
      )}
      
      <div className={`flex flex-col gap-1 flex-1 ${isBot ? '' : 'items-end'}`}>
        <div className={`text-[#B5A3A3] text-[13px] font-normal leading-5 max-w-[360px] max-sm:max-w-full ${isBot ? '' : 'text-right'}`}>
          {senderName || (isBot ? 'Movie Chatbot' : 'User')}
        </div>
        <div className={`text-base font-normal leading-6 max-w-[360px] px-4 py-3 rounded-xl max-sm:text-sm max-sm:max-w-full max-sm:px-3 max-sm:py-2.5 ${
          isBot 
            ? 'text-white bg-[#362B2B]' 
            : 'text-[#171212] bg-[#E8B5B8]'
        }`}>
          {message}
        </div>
      </div>
      
      {!isBot && (
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          alt="User avatar"
          className="w-[40px] h-[40px] rounded-[20px]"
        />
      )}
    </div>
  );
};
