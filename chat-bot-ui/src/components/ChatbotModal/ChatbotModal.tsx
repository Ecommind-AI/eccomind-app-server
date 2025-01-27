import React, { useEffect, useState } from "react";
import ChatbotHeader from "../ChatbotHeader/ChatbotHeader";
import ChatbotMessages from "../ChatbotMessages/ChatbotMessages";
import ChatbotInput from "../ChatbotInput/ChatbotInput";
import "./ChatbotModal.css";
import axios from "axios";
import { Message } from "../../types";
import {
  addMessageToSessionConversation,
  getSessionConversation,
  initConversationId,
} from "../../services/conversations-service";

interface ChatbotModalProps {
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  initialMessages: Message[];
  primaryColor: string;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({
  onClose,
  modalRef,
  initialMessages,
  primaryColor,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [conversationId, setConversationId] = useState<number>(0);

  const timelyDisplayAssistantMessages = async ({
    userMessage,
    assistantMessages,
    suggestions,
    index = 0,
  }: {
    userMessage: Message;
    assistantMessages: Message[];
    suggestions: Message[];
    index?: number;
  }) => {
    const messagesToDisplay = [...assistantMessages, ...suggestions];
    if (index === 0) {
      setIsLoading(true);
    }
    console.log({ userMessage, messagesToDisplay, index });
    setMessages([
      ...messages.filter((m) => !m.isButton),
      userMessage,
      ...messagesToDisplay.slice(0, index + 1),
    ]);

    const nextMessageIndex = index + 1;
    if (messagesToDisplay[nextMessageIndex]) {
      if (messagesToDisplay[nextMessageIndex].isButton) {
        setIsLoading(false);
      }
      setTimeout(
        () =>
          timelyDisplayAssistantMessages({
            userMessage,
            assistantMessages,
            suggestions,
            index: nextMessageIndex,
          }),
        messagesToDisplay[nextMessageIndex].isButton ? 250 : 1000
      );
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      const messagesContainer = document.getElementById("messages-container");
      if (!messagesContainer) return;

      messagesContainer.scroll({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isVisible]);

  useEffect(() => {
    setConversationId(initConversationId());

    const conversation = getSessionConversation();
    setMessages([...messages, ...conversation]);
    setIsVisible(true);

    return () => setIsVisible(false);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { type: "user", text };
    setMessages([...messages.filter((m) => !m.isButton), newUserMessage]);
    addMessageToSessionConversation(newUserMessage);
    setIsLoading(true);

    try {
      const payload = {
        user_message: text,
        shop_domain: window.shopDomain || "shoesstore123235.myshopify.com",
        conv_id: conversationId,
      };

      const response = await axios.post(
        "https://eccomerce-virtual-assistant.onrender.com/chat",
        payload
      );

      const { model_reply } = response.data;

      // Parse the model_reply content
      const parsedModelReply = JSON.parse(model_reply);
      const messages = parsedModelReply.content.messages;
      const suggestions: string[] =
        parsedModelReply.content.suggestions?.items || [];
      const suggestionMessages: Message[] = suggestions.map((sText) => ({
        type: "user",
        isButton: true,
        text: sText,
      }));

      const newAssistantMessages: Message[] = [];

      messages.forEach((item: any) => {
        if (item.text) {
          // Add text message as a regular assistant message
          newAssistantMessages.push({ type: "assistant", text: item.text });
        } else if (item.product_name) {
          // Add product message with description and product details
          const productMessage: Message = {
            type: "assistant",
            text: item.product_description,
            products_recommendations: [
              {
                title: item.product_name,
                price: item.product_price,
                currency: item.product_currency,
                image_url: item.product_image_url,
                product_link: `/products/${item.product_handle}`,
              },
            ],
          };
          newAssistantMessages.push(productMessage);
        }
      });

      timelyDisplayAssistantMessages({
        userMessage: newUserMessage,
        assistantMessages: newAssistantMessages,
        suggestions: suggestionMessages,
      });
      newAssistantMessages.forEach((msg) =>
        addMessageToSessionConversation(msg)
      );
    } catch (error) {
      console.error("Error sending message:", error);
      const assistantErrorMessage: Message = {
        type: "assistant",
        text: "Sorry, I could not fetch an answer. Please try again later.",
      };
      setIsLoading(false);
      setMessages([...messages, newUserMessage, assistantErrorMessage]);
      addMessageToSessionConversation(assistantErrorMessage);
    }
  };

  return (
    <div ref={modalRef} className={`chatbot-modal ${isVisible ? "show" : ""}`}>
      <ChatbotHeader
        logoColor={primaryColor}
        initialMessages={initialMessages}
        setConversationId={setConversationId}
        onClose={onClose}
        setMessages={setMessages}
      />
      <ChatbotMessages
        messages={messages}
        setMessages={setMessages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
      <ChatbotInput
        sendButtonColor={primaryColor}
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={() => handleSendMessage(userInput)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatbotModal;
