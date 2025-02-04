import React from "react";
import AIChatbotIcon from "../../assets/Icons/AIChatbotIcon.png";
import "./Sidebar.css";
import WelcomIcon from "../../assets/Icons/WelcomIcon.png"
import SetupWizardIcon from "../../assets/Icons/SetupWizardIcon.png"
import InsightsIcon from "../../assets/Icons/InsightsIcon.png"

const Sidebar = ({ setCurrentStep, currentStep }) => {
  const handleChangeStepOnClick = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <img src={AIChatbotIcon} alt="" />
        </div>
        <h1 className="logo-text">AI Chatbot</h1>
      </div>
      <nav className="menu">
        <p className="menu-title">Main Menu</p>
        <ul>
          <li
            className={`menu-item ${currentStep === "Welcome" ? "active" : ""}`}
            onClick={() => handleChangeStepOnClick("Welcome")}
          >
            <div className="icon">
              <img src={WelcomIcon} alt="" />
            </div>
            <span>Welcome!</span>
          </li>
          <li
            className={`menu-item ${currentStep === "SetupWizard" ? "active" : ""}`}
            onClick={() => handleChangeStepOnClick("SetupWizard")}
          >
            <div className="icon">
              <img src={SetupWizardIcon} alt="" />
            </div>
            <span>Setup Wizard</span>
          </li>
          <li
            className={`menu-item ${currentStep === "Insights" ? "active" : ""}`}
            onClick={() => handleChangeStepOnClick("Insights")}
          >
            <div className="icon">
              <img src={InsightsIcon} alt="" />
            </div>
            <span>Insights</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
