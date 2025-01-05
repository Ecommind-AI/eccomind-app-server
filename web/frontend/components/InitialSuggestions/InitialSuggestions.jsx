import React, { useEffect, useState } from "react";
import "./InitialSuggestions.css";
import AddNewSuggestion from "./AddNewSuggestion";
import EditSuggestions from "./EditSuggestions";

const InitialSuggestions = ({ updateData }) => {
    const [isModalWindow, setIsModalWindow] = useState(false);
    const [state, setState] = useState({
        suggestions: [
            "Suggestion 1",
            "Suggestion 2",
            "Suggestion 3",
        ]
    });

    const [itemIndex, setItemIndex] = useState(0);
    const [modalWindowNameToOpen, setModalWindowToOpen] = useState("AddNewSuggestion");

    useEffect(() => {
        updateData("initialSuggestions", state);
    }, [state, updateData]);

    const handleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleDelete = (itemIndex) => {
        const newSuggestions = state.suggestions.filter((prevState, index) => index !== itemIndex);
        handleChange("suggestions", newSuggestions);
    }

    const handleOpenModelWindow = (windowName, itemIndex) => {
        setIsModalWindow(true);
        setItemIndex(itemIndex);
        setModalWindowToOpen(windowName);
    };

    return (
        <>
            {isModalWindow && modalWindowNameToOpen === "AddNewSuggestion" && (
                <AddNewSuggestion setIsModalwindow={setIsModalWindow} suggestionsList={state.suggestions} setChange={handleChange}/>
            )}
            {isModalWindow && modalWindowNameToOpen === "EditSuggestions" && (
                <EditSuggestions setIsModalwindow={setIsModalWindow} itemIndex={itemIndex} suggestionsList={state.suggestions} setChange={handleChange}/>
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
                                setIsModalWindow(true);
                            }}
                            className="block-container__title-button_add_new"
                        >
                            Add new
                        </button>
                    </div>
                </div>
                <div className="block-container__main">
                    <ul className="block-container__main-list">
                        {state.suggestions.map((element, index) => {
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
