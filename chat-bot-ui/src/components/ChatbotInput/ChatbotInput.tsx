import React, { useEffect, useState } from "react";
import "./ChatbotInput.css";

interface ChatbotInputProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  userInput,
  setUserInput,
  handleSendMessage,
  isLoading,
}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Detect if the text contains Hebrew characters
  const isHebrewText = (text: string) => /[\u0590-\u05FF]/.test(text);

  useEffect(() => {
    const handleResize = () => {
      const isKeyboard =
        window.innerHeight < document.documentElement.clientHeight - 100;
      setIsKeyboardVisible(isKeyboard);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      handleSendMessage();
      setUserInput(""); // Clear the input field
    }
  };

  return (
    <div
      className={`chatbot-input-container ${
        isKeyboardVisible ? "keyboard-visible" : ""
      }`}
    >
      <input
        type="text"
        className="chatbot-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        inputMode="text"
        pattern=".*"
        placeholder="Write a message..."
        dir={isHebrewText(userInput) ? "rtl" : "ltr"} // ✅ Dynamically set direction
      />
      <button
        className={`chatbot-send-button ${
          userInput.length < 1 ? "disabled" : ""
        }`}
        onClick={() => {
          handleSendMessage();
          setUserInput(""); // Clear the input field
        }}
        disabled={isLoading}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatbotInput;
