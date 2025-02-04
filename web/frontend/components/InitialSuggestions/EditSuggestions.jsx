import React, { useState } from "react";
import "./InitialSuggestions.css";
import LinkedInput from "../LinkedInput/LinkedInput";
import InitialSuggestionsIcon from "../../assets/Icons/InitialSuggestionsIcon.png"
import Exit from "../../assets/svgs/Exit.svg"


const EditSuggestions = ({ setIsModalwindow, itemIndex, suggestionsList, setChange }) => {
    const [state, setState] = useState(suggestionsList);

    const handleChange = (name, value) => {
        const updatedSuggestions = [...state];
        updatedSuggestions[itemIndex] = value;
        setState(updatedSuggestions);
    };

    const handleSaveChange = () => {
        setChange("initial_suggestions",state); 
        setIsModalwindow(false);
    };

    return (
        <div className="modal_block__container">
            <div className="modal_block__container-window">
                <div className="window_header">
                    <div className="window_header-title">
                        <img src={InitialSuggestionsIcon} alt="" className="window__header-img"/>
                        <h2 className="window__header-text">
                            Edit Suggestion
                        </h2>
                    </div>
                    <div className="window__header-exit">
                        <button className="window__header-exit-button" onClick={() => {setIsModalwindow(false)}}>
                            <img src={Exit} alt="" />
                        </button>
                    </div>
                </div>
                <div className="window__main window__main--tall">
                    <h3 className="window__main-title">
                        Suggestion
                    </h3>
                    <LinkedInput
                        linkedValue={state[itemIndex]}
                        onValueChange={handleChange}
                        inputType="textarea"
                        name="initial_suggestions"
                        className="window__main-field window__main-field--tall"
                        placeholder="Enter Suggestion"
                    />
                </div>
                <div className="window__submit-container">
                    <button className="window__submit-button" onClick={handleSaveChange}>
                        Edit Suggestion
                    </button>
                </div>
            </div>
        </div>
    );
};


export default EditSuggestions;
