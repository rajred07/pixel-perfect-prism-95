
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
