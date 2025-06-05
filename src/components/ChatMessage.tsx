
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
    <div className={`flex items-end gap-3 p-4 max-sm:p-3 font-poppins ${isBot ? '' : 'justify-end'}`}>
      {isBot && <SavyAvatar />}
      
      <div className={`flex flex-col gap-1 flex-1 ${isBot ? '' : 'items-end'}`}>
        <div className={`text-gray-500 dark:text-gray-400 text-xs font-medium max-w-[360px] max-sm:max-w-full ${isBot ? '' : 'text-right'}`}>
          {senderName || (isBot ? 'Savy' : 'You')}
        </div>
        <div className={`text-sm font-normal leading-relaxed max-w-[360px] px-4 py-3 max-sm:text-sm max-sm:max-w-full max-sm:px-3 max-sm:py-2.5 ${
          isBot 
            ? 'text-gray-800 dark:text-white bg-gradient-to-br from-purple-50/80 via-blue-50/80 to-purple-50/80 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-2xl rounded-bl-sm shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20' 
            : 'text-gray-800 dark:text-white bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl rounded-br-sm shadow-md'
        }`}>
          {message}
        </div>
      </div>
      
      {!isBot && (
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
        />
      )}
    </div>
  );
};




// import React from 'react';
// import ReactMarkdown from 'react-markdown';

// interface ChatMessageProps {
//   message: string;
//   sender: 'user' | 'bot';
// }

// export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
//   const isUser = sender === 'user';
//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
//       <div
//         className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
//           isUser
//             ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
//             : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//         } transition-all duration-50`} // Smooth transition for updates
//       >
//         <ReactMarkdown>{message}</ReactMarkdown>
//       </div>
//     </div>
//   );
// };