import React from "react";
import ChatIcon from "../../assets/chat-default-icon.svg";
import "./ChatbotHeader.css";
import { Message } from "../../types";
import {
  deleteSessionConversationId,
  initConversationId,
  resetConversationSessionHistory,
} from "../../services/conversations-service";

interface ChatbotHeaderProps {
  onClose: () => void;
  setMessages: (messages: Message[]) => void;
  setConversationId: (convdId: number) => void;
  initialMessages: Message[];
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  onClose,
  setMessages,
  setConversationId,
  initialMessages,
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
      <div className="chatbot-logo-container">
        <img
          src={ChatIcon}
          alt="Chatbot Logo"
          className="chatbot-logo"
          width={30}
        />
      </div>
    </div>
  );
};

export default ChatbotHeader;
