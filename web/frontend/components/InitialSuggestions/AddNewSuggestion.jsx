import React, { useState } from "react";
import "./InitialSuggestions.css";
import LinkedInput from "../LinkedInput/LinkedInput";

const AddNewSuggestion = ({ setIsModalwindow, suggestionsList, setChange }) => {
    const [state, setState] = useState({
        newItemValue: '',
        list: suggestionsList
    });

    const handleChange = (name, value) => {
        setState({ ...state, newItemValue: value });
    };

    const handleAddSuggestion = () => {
        const updatedList = [...state.list, state.newItemValue];
        setState({ ...state, list: updatedList, newItemValue: '' });
        setChange("initial_suggestions", updatedList); 
        setIsModalwindow(false);
    };
    
    return (
        <div className="modal_block__container">
            <div className="modal_block__container-window">
                <div className="window_header">
                    <div className="window_header-title">
                        <img src="../../assets/Icons/InitialSuggestionsIcon.png" alt="" className="window__header-img"/>
                        <h2 className="window__header-text">
                            Add new Suggestion
                        </h2>
                    </div>
                    <div className="window__header-exit">
                        <button className="window__header-exit-button" onClick={() => {setIsModalwindow(false)}}>
                            <img src="../../assets/svgs/Exit.svg" alt="" />
                        </button>
                    </div>
                </div>
                <div className="window__main window__main--tall">
                    <h3 className="window__main-title">
                        Suggestion
                    </h3>
                    <LinkedInput
                        linkedValue={state.newItemValue}
                        onValueChange={handleChange}
                        inputType="textarea"
                        name="initial_suggestions"
                        className="window__main-field window__main-field--tall"
                        placeholder="Enter Suggestion"
                    />
                </div>
                <div className="window__submit-container">
                    <button className="window__submit-button" onClick={handleAddSuggestion}>
                        Add New Suggestion
                    </button>
                </div>
            </div>
        </div>
    );
};


export default AddNewSuggestion;
