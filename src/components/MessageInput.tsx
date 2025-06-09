import React, { useState } from "react";
import { SuggestionPills } from "./SuggestionPills";

interface MessageInputProps {
  onSendMessage: (message: string, sender: "user" | "bot") => void;
  placeholder?: string;
  selectedCategory: string;
  selectedMovie: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = "Type your message here...",
  selectedCategory,
  selectedMovie,
}) => {
  const [message, setMessage] = useState("");

  const thinkingMessages = [
    "🍿 Just a sec! Savyy is searching her movie memory...",
    "🎬 Savyy is queuing up a great answer...",
    "🧠 Hmm... Savyy is having a movie moment...",
    "💖 Savyy's cooking up something sweet for you...",
    "🎞️ Savyy's flipping through film reels in her mind...",
    "🎥 One moment! Savyy is rolling the perfect scene...",
    "✨ Savyy is crafting a cinematic reply just for you...",
    "📽️ Savyy paused the tape — thinking deeply...",
    "👀 Savyy is watching all the movies in fast-forward...",
    "📚 Savyy is browsing her mental movie library...",
    "🌟 Hold tight! Savyy is picking a 5-star answer...",
    "🕵️‍♀️ Savyy is investigating behind the scenes...",
    "🎭 Savyy is acting out the possibilities in her head...",
    "📼 Rewinding memories… Savyy's almost there!",
    "🍫 Like a good movie snack, Savyy's answer is loading...",
    "🛋️ Savyy's settling into the couch to think with you...",
    "🎧 Savyy's humming a soundtrack while thinking...",
    "🧸 Savyy's hugging a film reel and thinking deeply...",
    "📀 Savyy's burning the perfect answer onto a DVD...",
    "💡 Idea loading… Savyy's script is almost ready!",
    "⏳ A tiny moment — Savyy's rolling the credits of her thoughts..."
  ];

  const getRandomThinkingMessage = () => {
    return thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Send user message to chat
      const userMessage = message.trim();
      onSendMessage(userMessage, "user"); // Set sender as 'user'
      setMessage("");

      // Show thinking message immediately
      const thinkingMessage = getRandomThinkingMessage();
      onSendMessage(thinkingMessage, "bot");

      try {
        // Send request to FastAPI backend
        const response = await fetch("http://localhost:8000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: selectedCategory,
            movie: selectedMovie,
            query: userMessage,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch response from backend");
        }

        const data = await response.json();
        const botResponse =
          data.response || "Sorry, I could not process your request.";

        // Replace thinking message with actual bot response
        onSendMessage(botResponse, "bot"); // Set sender as 'bot'
      } catch (error) {
        console.error("Error communicating with backend:", error);
        // Replace thinking message with error message
        onSendMessage(
          "Sorry, there was an error processing your request. Please try again later.",
          "bot"
        ); // Set sender as 'bot'
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Send suggestion as user message
    onSendMessage(suggestion, "user"); // Set sender as 'user'

    // Show thinking message immediately
    const thinkingMessage = getRandomThinkingMessage();
    onSendMessage(thinkingMessage, "bot");

    try {
      // Send request to FastAPI backend
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          movie: selectedMovie,
          query: suggestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from backend");
      }

      const data = await response.json();
      const botResponse =
        data.response || "Sorry, I could not process your request.";

      // Replace thinking message with actual bot response
      onSendMessage(botResponse, "bot"); // Set sender as 'bot'
    } catch (error) {
      console.error("Error communicating with backend:", error);
      // Replace thinking message with error message
      onSendMessage(
        "Sorry, there was an error processing your request. Please try again later.",
        "bot"
      ); // Set sender as 'bot'
    }
  };

  const searchIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]">
    <g clip-path="url(#clip0_2507_653)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5306 20.4694L16.8366 15.7762C19.6629 12.383 19.3204 7.36693 16.0591 4.38935C12.7978 1.41176 7.77134 1.526 4.64867 4.64867C1.526 7.77134 1.41176 12.7978 4.38935 16.0591C7.36693 19.3204 12.383 19.6629 15.7762 16.8366L20.4694 21.5306C20.7624 21.8237 21.2376 21.8237 21.5306 21.5306C21.8237 21.2376 21.8237 20.7624 21.5306 20.4694V20.4694ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25C6.77379 17.2459 3.75413 14.2262 3.75 10.5V10.5Z" fill="white"></path>
    </g>
    <defs>
      <clipPath id="clip0_2507_653">
        <rect width="24" height="24" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>`;

  return (
    <div className="flex flex-col font-poppins border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#171212]">
      <SuggestionPills onSuggestionClick={handleSuggestionClick} />
      <div className="flex flex-col px-6 py-4 max-w-4xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex items-center flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 shadow-lg">
            <button
              type="submit"
              className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-12 h-12 rounded-l-xl transition-all duration-200 shadow-md hover:shadow-lg"
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
              className="text-gray-700 dark:text-gray-200 text-base font-normal leading-6 flex-1 bg-transparent px-4 py-3 rounded-r-xl border-none outline-none placeholder-gray-500 dark:placeholder-gray-400"
              aria-label="Message input"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
