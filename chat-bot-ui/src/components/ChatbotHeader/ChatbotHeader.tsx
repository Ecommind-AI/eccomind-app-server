import React from "react";
import "./ChatbotHeader.css";
import { Message } from "../../types";
import {
  deleteSessionConversationId,
  initConversationId,
  resetConversationSessionHistory,
} from "../../services/conversations-service";
import ChatLogo from "../../assets/button-logo.svg";

interface ChatbotHeaderProps {
  onClose: () => void;
  setMessages: (messages: Message[]) => void;
  setConversationId: (convdId: number) => void;
  initialMessages: Message[];
  logoColor: string;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  onClose,
  setMessages,
  setConversationId,
  initialMessages,
  logoColor,
}) => {
  const handleNewChat = () => {
    setMessages(initialMessages);
    resetConversationSessionHistory();
    deleteSessionConversationId();
    setConversationId(initConversationId());
  };

  return (
    <div>
      {/* Header Section */}
      <div className="chatbot-modal-header">
        <button className="chatbot-back-button" onClick={onClose}>
          ←
        </button>
        <div className="chatbot-header-center">
          <span className="chatbot-status-dot"></span>
          <span className="chatbot-header-title">AI Assistant</span>
        </div>
        <div className="start-new-chat-button" onClick={handleNewChat}>
          new chat
        </div>
      </div>

      {/* Circular Logo */}
      <div
        className="chatbot-logo-container"
        style={{ backgroundColor: logoColor }}
      >
        <img
          src={ChatLogo}
          alt="Chatbot Logo"
          className="chatbot-header-icon"
        />
      </div>
    </div>
  );
};

export default ChatbotHeader;
