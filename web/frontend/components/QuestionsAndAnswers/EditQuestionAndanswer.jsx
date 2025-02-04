import React, { useState } from "react";
import "./QuestionsAndAnswers.css";
import LinkedInput from "../LinkedInput/LinkedInput";
import InitialSuggestionsIcon from "../../assets/Icons/InitialSuggestionsIcon.png"
import Exit from "../../assets/svgs/Exit.svg"


const EditQuestionAndAnswer = ({ setIsModalwindow, itemIndex, questionsAndAnswersList, setChange }) => {
    const [state, setState] = useState(questionsAndAnswersList);

    const handleChange = (name, value) => {
        const updatedList = [...state];
        updatedList[itemIndex] = { ...updatedList[itemIndex], [name]: value };
        setState(updatedList);
    };

    const handleSaveChange = () => {
        setChange("FAQs", state);
        setIsModalwindow(false);
    };

    return (
        <div className="modal_block__container">
            <div className="modal_block__container-window modal_block__container-window--tall">
                <div className="window_header">
                    <div className="window_header-title">
                        <img src={InitialSuggestionsIcon} alt="" className="window__header-img"/>
                        <h2 className="window__header-text">
                            Edit Question and Answer
                        </h2>
                    </div>
                    <div className="window__header-exit">
                        <button className="window__header-exit-button" onClick={() => setIsModalwindow(false)}>
                            <img src={Exit} alt="" />
                        </button>
                    </div>
                </div>

                <div className="window__main window__main--small">
                    <h3 className="window__main-title">
                        Question
                    </h3>
                    <LinkedInput
                        linkedValue={state[itemIndex].question} 
                        onValueChange={handleChange} 
                        inputType="text"
                        name="question"
                        className="window__main-field"
                        placeholder="Enter Question"
                    />
                </div>

                <div className="window__main window__main--tall">
                    <h3 className="window__main-title">
                        Answer
                    </h3>
                    <LinkedInput
                        linkedValue={state[itemIndex].answer}
                        onValueChange={handleChange} 
                        inputType="textarea"
                        name="answer"
                        className="window__main-field window__main-field--tall"
                        placeholder="Enter Answer"
                    />
                </div>

                <div className="window__submit-container">
                    <button className="window__submit-button" onClick={handleSaveChange}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditQuestionAndAnswer;
