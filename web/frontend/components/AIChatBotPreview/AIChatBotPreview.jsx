import React from "react";
import "./AIChatBotPreview.css";

const AIChatBotPreview = ({ initial_message, primary_color, secondary_color, initial_suggestions, FAQs}) => {
    return (
        <div className="block-container block-container--chat">
            <div className="block-container__header" style={{backgroundColor:secondary_color}}>
                <div className="block-container__header-title">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8.66663" cy="8" r="6" fill="#84CC16" stroke={secondary_color} stroke-width="4"/>
                    </svg>
                    <h1 className="block-container__header-title-text">AI Chatbot Preview</h1>
                </div>
                <div className="block-container__header-logo"  style={{backgroundColor:primary_color}}>
                    <img src="../../assets/svgs/AIButtonLogo.svg" alt="" className="block-container__header-logo-img"/>
                </div>
            </div>
            <div className="block-container__chat">
                <div className="block-container__chat-messages">
                    <div className="block-container__main-chat-message-container block-container__main-chat-message-container--bot">
                        <div className="block-container__main-chat-message">
                            {initial_message}
                        </div>
                    </div>
                        {
                            initial_suggestions.map((el, index)=>(
                                <div className="block-container__main-chat-message-container block-container__main-chat-message-container--bot">
                                    <div key={index} className="block-container__main-chat-message block-container__main-chat-message--select">
                                        {el}
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>

            <div className="block-container__input_send">
                <input placeholder="Write a message..." type="text" className="block-container__chat-input_send-field" />
                <button className="block-container__chat-input_send-button"  style={{backgroundColor:primary_color}}>
                    <svg width="" height="" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>
        </div>
    );
};

export default AIChatBotPreview;
