import React, { useEffect, useState, useRef } from "react";
import "./ChatbotMessages.css";
import { Message } from "../../types";
import { ProductMessage } from "./ProductRecommendation/ProductRecommendation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BOTTOM_TRESHOLD = 100; // pixels from bottom to consider "at bottom"
const TOAST_OPTIONS = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  containerId: "chat-modal-toast",
  style: {
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "8px",
    minHeight: "auto",
  },
};

interface ChatbotMessagesProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  handleSendMessage: (text: string) => void;
  autoScrollToNewMessages?: boolean;
}

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  messages,
  isLoading,
  handleSendMessage,
  autoScrollToNewMessages = false,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const previousMessagesLength = useRef(0);

  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (!messagesContainer) return;

    messagesContainer.addEventListener("scroll", updateIsBottom);
    updateIsBottom();

    return () => {
      messagesContainer.removeEventListener("scroll", updateIsBottom);
    };
  }, []);

  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (!messagesContainer) return;

    // Count only assistant messages (no suggestions, no user messages, no loading)
    const assistantMessages = messages.filter(
      (msg) => msg.type === "assistant" && !msg.isButton
    ).length;

    // Show toast only for new assistant messages
    if (
      !isAtBottom &&
      assistantMessages > previousMessagesLength.current &&
      !autoScrollToNewMessages
    ) {
      toast.info("New message!", TOAST_OPTIONS);
    }

    // Update previous count of assistant messages
    previousMessagesLength.current = assistantMessages;
  }, [messages, isAtBottom]);

  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (!messagesContainer) return;

    if (autoScrollToNewMessages) {
      messagesContainer.scroll({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [autoScrollToNewMessages]);

  const updateIsBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (!messagesContainer) return;

    const position =
      messagesContainer.scrollHeight -
      messagesContainer.scrollTop -
      messagesContainer.clientHeight;
    const newIsAtBottom = position < BOTTOM_TRESHOLD;

    setIsAtBottom(newIsAtBottom);
  };

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (!messagesContainer) return;

    messagesContainer.scroll({
      top: messagesContainer.scrollHeight,
      behavior: "smooth",
    });
  };

  // Function to detect if the text contains Hebrew characters
  const isHebrewText = (text: string) => /[\u0590-\u05FF]/.test(text);

  // Function to format text with **bold** support and <br> for newlines
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)|(\n)/); // Split by **bold text** and \n
    return parts.map((part, index) => {
      if (part === "\n") {
        return <br key={index} />;
      } else if (part?.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        containerId="chat-modal-toast"
      />
      <div className="chatbot-messages" id="messages-container">
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {/* Text Messages */}
            {msg?.text && !msg.products_recommendations && (
              <div
                className={`chatbot-message ${msg.type} ${
                  msg.isButton ? "suggestion" : ""
                }`}
                dir={isHebrewText(msg.text) ? "rtl" : "ltr"} // ✅ Dynamically set text direction
              >
                {msg.isButton ? (
                  <p
                    className="chatbot-text"
                    onClick={() => handleSendMessage(msg!.text!)}
                  >
                    {formatText(msg.text)}
                  </p>
                ) : (
                  <p className="chatbot-text">{formatText(msg.text)}</p>
                )}
              </div>
            )}

            {/* Product Messages */}
            {msg.products_recommendations && <ProductMessage msg={msg} />}
          </React.Fragment>
        ))}
        {isLoading && (
          <div className="chatbot-message assistant">
            <div className="loading-container">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        {!isAtBottom && (
          <button
            className="scroll-to-bottom-button"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            ↓
          </button>
        )}
      </div>
    </>
  );
};

export default ChatbotMessages;
