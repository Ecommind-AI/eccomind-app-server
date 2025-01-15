import React, { useState, useRef, useEffect } from "react";
import "./ChatbotConfiguration.css";
import LinkedInput from "../LinkedInput/LinkedInput";
import ChatBotConfigIcon from "../../assets/Icons/ChatBotConfigIcon.png"
import ArrowDown from "../../assets/Icons/ArrowDown.png"

const ChatbotConfiguration = ({
  updateData,
  initial_message,
  shop_description,
  general_information,
  primary_color,
  secondary_color,
}) => {
  const [state, setState] = useState({
    primary_color: primary_color,
    secondary_color: secondary_color,
    initial_message: initial_message,
    shop_description: shop_description,
    general_information: general_information,
  });

  const primaryColorRef = useRef(null);
  const secondaryColorRef = useRef(null);

  useEffect(() => {
    updateData("primary_color", state.primary_color);
    updateData("secondary_color", state.secondary_color);
    updateData("initial_message", state.initial_message);
    updateData("shop_description", state.shop_description);
    updateData("general_information", state.general_information);
  }, [state]);

  const handleChange = (name, value) => {
    setState((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };
      updateData(name, value);
      return updatedState;
    });
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
        <img
          src={ChatBotConfigIcon}
          alt=""
          className="block-container__title-img"
        />
        <h2 className="block-container__title-text">Chatbot Configuration</h2>
      </div>
      {/* <div className="block-container__settings">
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
      </div> */}

      <div
        className="block-container__settings block-container__settings--twice_center"
        style={{ height: "50%" }}
      >
        <div className="block-container__settings-sub_container">
          <h3 className="block-container__settings-header">Primary Color</h3>
          <div
            className="block-container__settings-field block-container__settings-field--color_select"
            onClick={() => openColorPicker(primaryColorRef)}
          >
            <div>
              <div
                className="block-container__settings-field-color_circle_select"
                style={{ backgroundColor: primary_color }}
              ></div>
              <h3 className="block-container__settings-field-color_selected_name">
                {primary_color
                  ? primary_color.slice(1).toUpperCase()
                  : "No color selected"}
              </h3>
            </div>
            <img
              src={ArrowDown}
              alt=""
              className="block-container__settings-field-color_selected_img"
            />
          </div>
          <input
            type="color"
            ref={primaryColorRef}
            value={primary_color}
            onChange={(e) => handleColorChange("primary_color", e.target.value)}
            style={{ display: "none" }}
          />
        </div>

        <div className="block-container__settings-sub_container">
          <h3 className="block-container__settings-header">Secondary Color</h3>
          <div
            className="block-container__settings-field block-container__settings-field--color_select"
            onClick={() => openColorPicker(secondaryColorRef)}
          >
            <div>
              <div
                className="block-container__settings-field-color_circle_select"
                style={{ backgroundColor: secondary_color }}
              ></div>
              <h3 className="block-container__settings-field-color_selected_name">
                {secondary_color
                  ? secondary_color.slice(1).toUpperCase()
                  : "No color selected"}
              </h3>
            </div>
            <img
              src={ArrowDown}
              alt=""
              className="block-container__settings-field-color_selected_img"
            />
          </div>
          <input
            type="color"
            ref={secondaryColorRef}
            value={secondary_color}
            onChange={(e) =>
              handleColorChange("secondary_color", e.target.value)
            }
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="block-container__settings" style={{ height: "50%" }}>
        <h2 className="block-container__settings-header">Initial Message</h2>
        <LinkedInput
          linkedValue={initial_message}
          onValueChange={handleChange}
          name="initial_message"
          type="text"
          className="block-container__settings-field"
          placeholder={
            initial_message === undefined
              ? "How can we help you today... 👋"
              : ""
          }
        />
      </div>
      <div className="block-container__settings">
        <h2 className="block-container__settings-header">Store Description</h2>
        <LinkedInput
          linkedValue={shop_description}
          onValueChange={handleChange}
          inputType="textarea"
          name="shop_description"
          className="block-container__settings-field--tall block-container__settings-field"
          placeholder={
            shop_description === undefined
              ? "Enter Store Description"
              : ""
          }
        />
      </div>
      <div className="block-container__settings">
        <h2 className="block-container__settings-header">
          General Information
        </h2>
        <LinkedInput
          linkedValue={general_information}
          onValueChange={handleChange}
          inputType="textarea"
          name="general_information"
          className="block-container__settings-field--tall block-container__settings-field"
          placeholder={
            general_information === undefined ? "General Information" : null
          }
        />
      </div>
    </div>
  );
};

export default ChatbotConfiguration;
