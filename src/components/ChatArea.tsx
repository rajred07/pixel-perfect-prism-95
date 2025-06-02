import React from 'react';
import { ChatMessage } from './ChatMessage';

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
  return (
    <main className="flex-1 overflow-y-auto">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.message}
          sender={msg.sender}
          timestamp={msg.timestamp}
        />
      ))}
    </main>
  );
};
