import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatbotConfiguration from "../ChatbotConfiguration/ChatbotConfiguration.jsx";
import "./SetupWizard.css";
import ReturnPolicy from "../ReturnPolicy/ReturnPolicy.jsx";
import DeliverPolicy from "../DeliverPolicy/DeliverPolicy.jsx";
import InitialSuggestions from "../InitialSuggestions/InitialSuggestions.jsx";
import QuestionsAndAnswers from "../QuestionsAndAnswers/QuestionsAndAnswers.jsx";
import AIChatBotPreview from "../AIChatBotPreview/AIChatBotPreview.jsx";
import { useQuery } from "react-query";

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
    FAQs: [],
  });

  const [setupData, setSetupData] = useState(initialSetupData);
  const [isSetupDataChaged, setIsSetupDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["shopData"],
    queryFn: async () => {
      const response = await fetch("/api/merchant/shop/data");
      const parsedInitialData = await response.json();
      setInitialSetupData(parsedInitialData);
      setSetupData(parsedInitialData);
      setIsLoading(false);
    },
    staleTime: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsSetupDataChanged(
      JSON.stringify(initialSetupData) !== JSON.stringify(setupData)
    );
  }, [setupData, initialSetupData]);

  useEffect(() => {
    setSetupData(initialSetupData);
  }, []);

  const updateData = useCallback((key, newData) => {
    setSetupData((prevState) => ({
      ...prevState,
      [key]: newData,
    }));
  }, []);

  const SaveChanges = async () => {
    console.log("Saving data: ", setupData);
    setIsSaving(true); // Start loading state

    try {
      // Transform FAQs array back to string format
      const transformedData = {
        ...setupData,
        FAQs: setupData.FAQs.map(
          (faq) => `Q: ${faq.question}\nA: ${faq.answer}`
        ).join("\n\n"),
      };

      console.log("transformedData", transformedData);
      // Send the updated data to the backend
      const response = await fetch("/api/merchant/shop/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Shop data updated successfully:", responseData);

        // Update the local state to reflect the saved data
        setInitialSetupData(setupData);
        setIsSetupDataChanged(false);
      } else {
        console.error("Failed to update shop data:", response.statusText);
      }
    } catch (error) {
      console.error("Error while saving changes:", error);
    } finally {
      setIsSaving(false); // End loading state
    }
  };

  return (
    <div className="setup-wizard">
      <h1 className="title">Setup Wizard</h1>

      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
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
            <AIChatBotPreview
              initial_message={setupData.initial_message}
              primary_color={setupData.primary_color}
              secondary_color={setupData.secondary_color}
              initial_suggestions={setupData.initial_suggestions}
              FAQs={setupData.FAQs}
            />
            <div className="setup-wizard__submit-container">
              <button
                className="setup-wizard__submit-button"
                onClick={SaveChanges}
                disabled={!isSetupDataChaged}
              >
                {isSaving ? <div className="spinner"></div> : "Save Changes"}
                <div className="tooltip">
                  {!isSetupDataChaged
                    ? "Change setup data to save"
                    : "Click to save"}
                </div>
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SetupWizard;
