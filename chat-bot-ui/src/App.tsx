import { useEffect, useRef, useState } from "react";
import "./app.css";
import ChatbotButton from "./components/ChatbotButton/ChatbotButton";
import ChatbotModal from "./components/ChatbotModal/ChatbotModal";
import { useHandleClickOutSide } from "./hooks/use-handle-click-outside";
import { useShopData } from "./hooks/use-shop-data";
import { defaultInitialMessages } from "./constants";
import { Message } from "./types";
import { createInitialMessagesFromShopData } from "./services/conversations-service";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [initialMessages, setInitialMessages] = useState<Message[]>(
    defaultInitialMessages
  );
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal itself
  const buttonRef = useRef<HTMLDivElement>(null); // Ref to the button itself
  const { shopData, isLoading } = useShopData();
  useHandleClickOutSide(modalRef, buttonRef, () => setModalVisible(false));
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (!isLoading && shopData) {
      setInitialMessages(createInitialMessagesFromShopData(shopData));
      if (shopData.test_mode && queryParams.get("ecommind") !== "true") {
        setIsVisible(false);
      }
    }
  }, [isLoading, shopData, queryParams.get("ecommind")]);

  return (
    isVisible &&
    !isLoading &&
    shopData && (
      <div>
        <ChatbotButton
          buttonRef={buttonRef}
          onClick={() => {
            setModalVisible(!modalVisible);
          }}
        />
        {modalVisible && (
          <ChatbotModal
            initialMessages={initialMessages}
            modalRef={modalRef}
            onClose={() => {
              setModalVisible(false);
            }}
          />
        )}
      </div>
    )
  );
};

export default App;
