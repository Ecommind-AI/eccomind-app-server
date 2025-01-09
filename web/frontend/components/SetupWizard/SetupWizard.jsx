import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatbotConfiguration from "../ChatbotConfiguration/ChatbotConfiguration.jsx";
import "./SetupWizard.css";
import ReturnPolicy from "../ReturnPolicy/ReturnPolicy.jsx";
import DeliverPolicy from "../DeliverPolicy/DeliverPolicy.jsx";
import InitialSuggestions from "../InitialSuggestions/InitialSuggestions.jsx";
import QuestionsAndAnswers from "../QuestionsAndAnswers/QuestionsAndAnswers.jsx";
import AIChatBotPreview from "../AIChatBotPreview/AIChatBotPreview.jsx";

const SetupWizard = () => {
  const [initialSetupData, setInitialSetupData] = useState({
    initial_message: "hello! friend",
    initial_suggestions: ["suggestions1", "suggestions2", "suggestions3"],
    delivery_description: "description",
    shop_description: "shop description",
    general_information: "general information",
    returns_policy: "returns_policy",
    primary_color: "#FAFAFA",
    secondary_color: "#5A0C0C",
    FAQs: [
      { question: "What is the color of the shoe?", answer: "500$" },
      { question: "What is the color of the hat?", answer: "300$" },
    ],
  });
  const [setupData, setSetupData] = useState(initialSetupData);

  const [isSetupDataChaged, setIsSetupDataChanged] = useState(false);

  useEffect(() => {
    const dataChanged = JSON.stringify(initialSetupData) !== JSON.stringify(setupData);
    setIsSetupDataChanged(dataChanged);
  }, [setupData, initialSetupData]);
  
  

  useEffect(()=>{
    const fetchData = async () => {
      try{
        //setInitialData(serverData);
        setData(initialSetupData);
      } catch (error) {

      }
    }

    fetchData();
  }, [])

  const updateData = useCallback((key, newData) => {
    setSetupData((prevState) => ({
      ...prevState,
      [key]: newData,
    }));
  }, []);
  
  useEffect(() => {
    setInitialSetupData(setupData);
  }, [setupData]);
  

  const SaveChanges = () => {
    console.log("Saving data: ", setupData);
    try{
      //setInitialData(serverData);
      setInitialSetupData(setupData);
    } catch (error) {

    }
  };

  return (
    <div className="setup-wizard">
      <h1 className="title">Setup Wizard</h1>
      <div className="setup-wizard__container">
        <section className="setup-wizard__container-column">
          <ChatbotConfiguration 
            updateData={updateData} 
            initial_message={setupData.initial_message}
            shop_description={setupData.shop_description}
            general_information={setupData.general_information}
            primary_color={setupData.primary_color}
            secondary_color={setupData.secondary_color}
          />
        </section>
        <section className="setup-wizard__container-column">
          <ReturnPolicy 
            updateData={updateData} 
            returns_policy={setupData.returns_policy}
          />
          <DeliverPolicy 
            updateData={updateData} 
            delivery_description={setupData.delivery_description}
          />
          <InitialSuggestions 
            updateData={updateData} 
            initial_suggestions={setupData.initial_suggestions}
          />
        </section>
        <section className="setup-wizard__container-column">
          <QuestionsAndAnswers 
            updateData={updateData} 
            FAQs={setupData.FAQs}
          />
          <AIChatBotPreview />
          <div className="setup-wizard__submit-container">
            <button
              className="setup-wizard__submit-button"
              onClick={SaveChanges}
            >
              Save Changes
              <div className="tooltip">{!isSetupDataChaged ? "Change setup data to save" : "Click to save"}</div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SetupWizard;
