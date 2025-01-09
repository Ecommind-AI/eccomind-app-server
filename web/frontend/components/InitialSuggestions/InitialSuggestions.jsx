import React, { useEffect, useState } from "react";
import "./InitialSuggestions.css";
import AddNewSuggestion from "./AddNewSuggestion";
import EditSuggestions from "./EditSuggestions";

const InitialSuggestions = ({ updateData, initial_suggestions }) => {
    const [isModalWindow, setIsModalWindow] = useState(false);
    const [state, setState] = useState({
        initial_suggestions: initial_suggestions
    });

    const [itemIndex, setItemIndex] = useState(0);
    const [modalWindowNameToOpen, setModalWindowToOpen] = useState("AddNewSuggestion");

    useEffect(() => {
        updateData("initial_suggestions", state.initial_suggestions);
    }, [state.initial_suggestions]);

    const handleChange = (name, value) => {
        setState((prevState) => {
            const updatedState = {
                ...prevState,
                [name]: value
            };
            updateData(name, value); 
            return updatedState;
        });
    };
    
    const handleDelete = (itemIndex) => {
        const newSuggestions = state.initial_suggestions.filter((prevState, index) => index !== itemIndex);
        handleChange("initial_suggestions", newSuggestions);
    }

    const handleOpenModelWindow = (windowName, itemIndex) => {
        setIsModalWindow(true);
        setItemIndex(itemIndex);
        setModalWindowToOpen(windowName);
    };

    return (
        <>
            {isModalWindow && modalWindowNameToOpen === "AddNewSuggestion" && (
                <AddNewSuggestion setIsModalwindow={setIsModalWindow} suggestionsList={state.initial_suggestions} setChange={handleChange}/>
            )}
            {isModalWindow && modalWindowNameToOpen === "EditSuggestions" && (
                <EditSuggestions setIsModalwindow={setIsModalWindow} itemIndex={itemIndex} suggestionsList={state.initial_suggestions} setChange={handleChange}/>
            )}

            <div className="block-container" style={{ padding: "0", gap: "0" }}>
                <div className="block-container__title block-container__title--combined">
                    <div className="title-main">
                        <img
                            src="../../assets/Icons/InitialSuggestionsIcon.png"
                            alt=""
                            className="block-container__title-img"
                        />
                        <h2 className="block-container__title-text">Initial Suggestions - Max 3</h2>
                    </div>
                    <div className="title-second">
                        <button
                            onClick={() => {
                                setModalWindowToOpen("AddNewSuggestion");
                                setIsModalWindow(true)
                            }}
                            className="block-container__title-button_add_new"
                            disabled={state.initial_suggestions.length === 3}
                            
                        >
                            Add new
                        </button>
                    </div>
                </div>
                <div className="block-container__main">
                    <ul className="block-container__main-list">
                        {state.initial_suggestions.map((element, index) => {
                            return (
                                <li key={index} className="block-container__main-item">
                                    <div className="block-container__main-item-suggestion">
                                        {element}
                                    </div>
                                    <div className="block-container__main-item-edit">
                                        <button
                                            onClick={() => {
                                                setModalWindowToOpen("EditSuggestions");
                                                setItemIndex(index);
                                                setIsModalWindow(true);
                                            }}
                                            className="block-container__main-item-edit-button block-container__main-item-edit-button--left"
                                        >
                                            <img src="../../assets/svgs/Edit.svg" alt="" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(index)
                                            }}
                                            className="block-container__main-item-edit-button block-container__main-item-edit-button--right"
                                        >
                                            <img src="../../assets/svgs/Bin.svg" alt="" />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default InitialSuggestions;
