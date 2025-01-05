import React, { useEffect, useState } from "react";
import "./QuestionsAndAnswers.css";
import AddNewQuestionsAndAnswers from "./AddNewQuestionsAndAnswers";
import EditQuestionAndAnswer from "./EditQuestionAndanswer";

const QuestionsAndAnswers = ({ updateData }) => {
    const [isModalWindow, setIsModalWindow] = useState(false);
    const [state, setState] = useState({
        questionsAndAnswers: [
            {
                question:'q1',
                answer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.'
            },
            {
                question:'q2',
                answer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.'
            },
        ]
    });

    const [itemIndex, setItemIndex] = useState(0);
    const [modalWindowNameToOpen, setModalWindowToOpen] = useState("AddNewSuggestion");

    useEffect(() => {
        updateData("questionsAndAnswers", state);
    }, [state, updateData]);

    const handleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleDelete = (itemIndex) => {
        const newQuestionsAndAnswers = state.questionsAndAnswers.filter((prevState, index) => index !== itemIndex);
        handleChange("questionsAndAnswers", newQuestionsAndAnswers);
    }

    const handleOpenModelWindow = (windowName, itemIndex) => {
        setIsModalWindow(true);
        setItemIndex(itemIndex);
        setModalWindowToOpen(windowName);
    };


    return (
        <>
            {isModalWindow && modalWindowNameToOpen === "AddNewQuestionsAndAnswers" && (
                <AddNewQuestionsAndAnswers setIsModalwindow={setIsModalWindow} questionsAndAnswersList={state.questionsAndAnswers} setChange={handleChange}/>
            )}
            {isModalWindow && modalWindowNameToOpen === "EditQuestionAndanswer" && (
                <EditQuestionAndAnswer setIsModalwindow={setIsModalWindow} itemIndex={itemIndex} questionsAndAnswersList={state.questionsAndAnswers} setChange={handleChange}/>
            )}
            <div className="block-container" style={{padding:"0", gap:"0"}}>
                <div className="block-container__title block-container__title--combined">
                    <div className="title-main">
                        <img src="../../assets/Icons/InitialSuggestionsIcon.png" alt="" className="block-container__title-img"/>
                        <h2 className="block-container__title-text">
                            Questions and Answers
                        </h2>
                    </div>
                    <div className="title-second">
                        <button 
                            onClick={() => {
                                setModalWindowToOpen("AddNewQuestionsAndAnswers");
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
                        
                        {
                            state.questionsAndAnswers.map((element, index)=>{
                                return (
                                    <li key={index}  className="block-container__main-item block-container__main-item--tall">
                                        <div className="block-container__main-item-header">
                                            <div className="block-container__main-item-suggestion">
                                                <strong>
                                                    {element.question}
                                                </strong>
                                            </div>
                                            <div className="block-container__main-item-edit">
                                                <button 
                                                    onClick={() => {
                                                        setModalWindowToOpen("EditQuestionAndanswer");
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
                                        </div>
                                        <div className="block-container__main-item-main">
                                            <p>
                                                {element.answer}
                                            </p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                </div>
            </div>
        </>
    );
};

export default QuestionsAndAnswers;
