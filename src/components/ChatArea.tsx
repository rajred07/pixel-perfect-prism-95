import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  message: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

interface ChatAreaProps {
  messages: Message[];
}

export const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 h-full" ref={scrollAreaRef}>
      <div className="flex flex-col">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
// import React, { useEffect, useRef, memo } from 'react';
// import { ScrollArea } from './ui/scroll-area';
// import ReactMarkdown from 'react-markdown';

// interface Message {
//   id: string;
//   message: string;
//   sender: 'bot' | 'user';
//   timestamp: string;
// }

// interface ChatAreaProps {
//   messages: Message[];
//   isBotTyping: boolean;
// }

// // Memoized Message Component
// const MessageItem = memo(({ msg }: { msg: Message }) => {
//   return (
//     <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
//       <div
//         className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
//           msg.sender === 'user'
//             ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
//             : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//         } transition-all duration-50`}
//       >
//         <ReactMarkdown>{msg.message}</ReactMarkdown>
//         <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//           {new Date(msg.timestamp).toLocaleTimeString()}
//         </div>
//       </div>
//     </div>
//   );
// });

// export const ChatArea: React.FC<ChatAreaProps> = ({ messages, isBotTyping }) => {
//   const scrollAreaRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
//       if (scrollContainer) {
//         scrollContainer.scrollTop = scrollContainer.scrollHeight;
//       }
//     }
//   }, [messages, isBotTyping]);

//   return (
//     <ScrollArea className="flex-1 h-full" ref={scrollAreaRef}>
//       <div className="flex flex-col p-4">
//         {messages.map((msg) => (
//           <MessageItem key={msg.id} msg={msg} />
//         ))}
//         {isBotTyping && (
//           <div className="flex justify-start mb-4">
//             <div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
//               Typing...
//             </div>
//           </div>
//         )}
//       </div>
//     </ScrollArea>
//   );
// };
// import React, { useEffect, useRef } from "react";
// import { ScrollArea } from "./ui/scroll-area";
// import ReactMarkdown from "react-markdown";

// interface Message {
//   id: string;
//   message: string;
//   sender: "bot" | "user";
//   timestamp: string;
// }

// interface ChatAreaProps {
//   messages: Message[];
//   isBotTyping: boolean; // Add prop for typing indicator
// }

// export const ChatArea: React.FC<ChatAreaProps> = ({
//   messages,
//   isBotTyping,
// }) => {
//   const scrollAreaRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       const scrollContainer = scrollAreaRef.current.querySelector(
//         "[data-radix-scroll-area-viewport]"
//       );
//       if (scrollContainer) {
//         scrollContainer.scrollTop = scrollContainer.scrollHeight;
//       }
//     }
//   }, [messages, isBotTyping]); // Add isBotTyping to dependencies

//   return (
//     <ScrollArea className="flex-1 h-full" ref={scrollAreaRef}>
//       <div className="flex flex-col p-4">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${
//               msg.sender === "user" ? "justify-end" : "justify-start"
//             } mb-4`}
//           >
//             <div
//               className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
//                 msg.sender === "user"
//                   ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//               } transition-all duration-50`}
//             >
//               <ReactMarkdown>{msg.message}</ReactMarkdown>
//               <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 {new Date(msg.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           </div>
//         ))}
//         {isBotTyping && (
//           <div className="flex justify-start mb-4">
//             <div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
//               Typing...
//             </div>
//           </div>
//         )}
//       </div>
//     </ScrollArea>
//   );
// };
