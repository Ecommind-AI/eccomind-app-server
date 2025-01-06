import React, { useCallback, useState } from "react";
import ChatbotConfiguration from "../ChatbotConfiguration/ChatbotConfiguration.jsx";
import "./SetupWizard.css";
import ReturnPolicy from "../ReturnPolicy/ReturnPolicy.jsx";
import DeliverPolicy from "../DeliverPolicy/DeliverPolicy.jsx";
import InitialSuggestions from "../InitialSuggestions/InitialSuggestions.jsx";
import QuestionsAndAnswers from "../QuestionsAndAnswers/QuestionsAndAnswers.jsx";
import AIChatBotPreview from "../AIChatBotPreview/AIChatBotPreview.jsx";

const SetupWizard = () => {
  const [setupData, setSetupData] = useState({
    initial_message: "hello! friend",
    initial_suggestions: ["suggestions1", "suggestions2", "suggestions3"],
    delivery_description: "description",
    shop_description: "shop description",
    general_information: "general information",
    returns_policy: "returns_policy",
    primary_color: "#FAFAFA",
    FAQs: [
      { question: "What is the color of the shoe?", answer: "500$" },
      { question: "What is the color of the hat?", answer: "300$" },
    ],
  });

  const [data, setData] = useState({
    chatBotConfig: {},
    returnPolicy: {},
    deliverPolicy: {},
    initialSuggestions: {},
    questionsAndAnswers: {},
  });

  const updateData = useCallback((key, newData) => {
    setData((prevState) => ({
      ...prevState,
      [key]: newData,
    }));
  }, []);

  const SaveChanges = () => {
    console.log("Saving data: ", data);
  };

  return (
    <div className="setup-wizard">
      <h1 className="title">Setup Wizard</h1>
      <div className="setup-wizard__container">
        <section className="setup-wizard__container-column">
          <ChatbotConfiguration updateData={updateData} />
        </section>
        <section className="setup-wizard__container-column">
          <ReturnPolicy updateData={updateData} />
          <DeliverPolicy updateData={updateData} />
          <InitialSuggestions updateData={updateData} />
        </section>
        <section className="setup-wizard__container-column">
          <QuestionsAndAnswers updateData={updateData} />
          <AIChatBotPreview />
          <div className="setup-wizard__submit-container">
            <button
              className="setup-wizard__submit-button"
              onClick={SaveChanges}
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SetupWizard;
