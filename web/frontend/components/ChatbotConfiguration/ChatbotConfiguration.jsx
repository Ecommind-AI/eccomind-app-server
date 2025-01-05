import React, { useState, useRef, useEffect } from "react";
import "./ChatbotConfiguration.css";
import LinkedInput from "../LinkedInput/LinkedInput";

const ChatbotConfiguration = ({ updateData }) => {
  const [state, setState] = useState({
    logo: '',
    primaryColor: '#2563EB',  
    secondaryColor: '#2563EB', 
    initialMessage: '',
    storeDesc: '',
    generalInfo: ''
  });

  const primaryColorRef = useRef(null);  
  const secondaryColorRef = useRef(null);  

  useEffect(() => {
    updateData("chatBotConfig", state);
  }, [state, updateData]);
  

  const handleChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleColorChange = (name, color) => {
    handleChange(name, color);
  };

  const openColorPicker = (ref) => {
    ref.current.click();  
  };

  return (
    <div className="block-container">
      <div className="block-container__title">
        <img src="../../assets/Icons/ChatBotConfigIcon.png" alt="" className="block-container__title-img" />
        <h2 className="block-container__title-text">
          Chatbot Configuration
        </h2>
      </div>
      <div className="block-container__settings">
        <div className="block-container__settings-sub_container block-container__settings-sub_container--twice_beetwen">
          <div className="block-container__settings-sub_container-main">
            <img src="../../assets/Icons/AIChatbotIcon.png" alt="" className="block-container__settings-sub_container-main-icon" />
            <h2 className="block-container__settings-sub_container-main-text">
              Chatbot Logo
            </h2>
          </div>
          <div className="block-container__settings-sub_container-second">
            <button className="block-container__settings-sub_container-second-button">
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="block-container__settings block-container__settings--twice_center">
        <div className="block-container__settings-sub_container">
          <h3 className="block-container__settings-header">
            Primary Color
          </h3>
          <div
            className="block-container__settings-field block-container__settings-field--color_select"
            onClick={() => openColorPicker(primaryColorRef)} 
          >
            <div>
              <div
                className="block-container__settings-field-color_circle_select"
                style={{ backgroundColor: state.primaryColor }}
              ></div>
              <h3 className="block-container__settings-field-color_selected_name">
                {state.primaryColor.slice(1).toUpperCase()}
              </h3>
            </div>
            <img src="../../assets/Icons/ArrowDown.png" alt="" className="block-container__settings-field-color_selected_img" />
          </div>
          <input
            type="color"
            ref={primaryColorRef}
            value={state.primaryColor}
            onChange={(e) => handleColorChange('primaryColor', e.target.value)}
            style={{ display: "none" }} 
          />
        </div>

        <div className="block-container__settings-sub_container">
          <h3 className="block-container__settings-header">
            Secondary Color
          </h3>
          <div
            className="block-container__settings-field block-container__settings-field--color_select"
            onClick={() => openColorPicker(secondaryColorRef)} 
          >
            <div>
              <div
                className="block-container__settings-field-color_circle_select"
                style={{ backgroundColor: state.secondaryColor }}
              ></div>
              <h3 className="block-container__settings-field-color_selected_name">
                {state.secondaryColor.slice(1).toUpperCase()}
              </h3>
            </div>
            <img src="../../assets/Icons/ArrowDown.png" alt="" className="block-container__settings-field-color_selected_img" />
          </div>
          <input
            type="color"
            ref={secondaryColorRef}
            value={state.secondaryColor}
            onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
            style={{ display: "none" }} 
          />
        </div>
      </div>

      <div className="block-container__settings">
        <h2 className="block-container__settings-header">
          Initial Message
        </h2>
        <LinkedInput
          linkedValue={state.initialMessage}
          onValueChange={handleChange}
          
          name="initialMessage"
          type="text"
          className="block-container__settings-field"
          placeholder="How can we help you today... 👋"
        />
      </div>
      <div className="block-container__settings">
        <h2 className="block-container__settings-header">
          Store Description
        </h2>
        <LinkedInput
          linkedValue={state.storeDesc}
          onValueChange={handleChange}
          inputType="textarea"

          name="storeDesc"
          className="block-container__settings-field--tall block-container__settings-field"
          placeholder="Enter Store Description"
        />
      </div>
      <div className="block-container__settings">
        <h2 className="block-container__settings-header">
          General Information
        </h2>
        <LinkedInput
          linkedValue={state.generalInfo}
          onValueChange={handleChange}
          inputType="textarea"

          name="generalInfo"
          className="block-container__settings-field--tall block-container__settings-field"
          placeholder="General Information"
        />
      </div>
    </div>
  );
};

export default ChatbotConfiguration;
