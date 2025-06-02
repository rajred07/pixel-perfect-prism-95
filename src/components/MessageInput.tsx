import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = "Type your message here..."
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const searchIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[24px] flex-1">
    <g clip-path="url(#clip0_2507_653)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5306 20.4694L16.8366 15.7762C19.6629 12.383 19.3204 7.36693 16.0591 4.38935C12.7978 1.41176 7.77134 1.526 4.64867 4.64867C1.526 7.77134 1.41176 12.7978 4.38935 16.0591C7.36693 19.3204 12.383 19.6629 15.7762 16.8366L20.4694 21.5306C20.7624 21.8237 21.2376 21.8237 21.5306 21.5306C21.8237 21.2376 21.8237 20.7624 21.5306 20.4694V20.4694ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25C6.77379 17.2459 3.75413 14.2262 3.75 10.5V10.5Z" fill="#B5A3A3"></path>
    </g>
    <defs>
      <clipPath id="clip0_2507_653">
        <rect width="24" height="24" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>`;

  return (
    <div className="flex flex-col px-4 py-3 max-sm:px-3 max-sm:py-2">
      <form onSubmit={handleSubmit} className="flex h-12 min-w-40 flex-col">
        <div className="flex items-start flex-1 rounded-xl">
          <button
            type="submit"
            className="flex justify-center items-center bg-[#362B2B] pl-4 rounded-[12px_0px_0px_12px] max-sm:pl-3 hover:bg-[#362B2B]/80 transition-colors"
            aria-label="Send message"
          >
            <div dangerouslySetInnerHTML={{ __html: searchIcon }} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="text-[#B5A3A3] text-base font-normal leading-6 flex-1 bg-[#362B2B] pl-2 pr-4 py-2 rounded-[0px_12px_12px_0px] max-sm:text-sm max-sm:pl-1.5 max-sm:pr-3 max-sm:py-2 border-none outline-none placeholder-[#B5A3A3]"
            aria-label="Message input"
          />
        </div>
      </form>
    </div>
  );
};
