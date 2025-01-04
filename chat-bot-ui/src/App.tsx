import { useEffect, useRef, useState } from "react";
import "./app.css";
import ChatbotButton from "./components/ChatbotButton/ChatbotButton";
import ChatbotModal from "./components/ChatbotModal/ChatbotModal";
import { useHandleClickOutSide } from "./hooks/use-handle-click-outside";
import { useShopData } from "./hooks/use-shop-data";
import { defaultInitialMessages, SHOP_DOMAIN } from "./constants";
import { Message } from "./types";
import { createInitialMessagesFromShopData } from "./services/conversations-service";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [initialMessages, setInitialMessages] = useState<Message[]>(
    defaultInitialMessages
  );
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal itself
  const buttonRef = useRef<HTMLDivElement>(null); // Ref to the button itself
  const { shopData, isLoading } = useShopData(SHOP_DOMAIN);
  useHandleClickOutSide(modalRef, buttonRef, () => setModalVisible(false));

  useEffect(() => {
    if (!isLoading && shopData) {
      setInitialMessages(createInitialMessagesFromShopData(shopData));
    }
  }, []);

  return (
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
