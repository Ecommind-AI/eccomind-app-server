import React, { useState } from "react";
import "./QuestionsAndAnswers.css";
import LinkedInput from "../LinkedInput/LinkedInput";
import InitialSuggestionsIcon from "../../assets/Icons/InitialSuggestionsIcon.png"
import Exit from "../../assets/svgs/Exit.svg"


const AddNewQuestionsAndAnswers = ({setIsModalwindow, questionsAndAnswersList, setChange}) => {
    const [state, setState] = useState({
        newItemValue: {
            question: '',
            answer: ''
        },
        list: questionsAndAnswersList
    });

    const handleChange = (field, value) => {
        setState(prevState => ({
            ...prevState,
            newItemValue: {
                ...prevState.newItemValue,
                [field]: value 
            }
        }));
    };

    const handleAddQuestionAndAnswer = () => {
        const updatedList = [...state.list, state.newItemValue];
        setState({ ...state, list: updatedList, newItemValue: { question: '', answer: '' } });
        setChange("FAQs", updatedList); 
        setIsModalwindow(false);
    };
    
    return (
        <div className="modal_block__container">
            <div className="modal_block__container-window modal_block__container-window--tall">
                <div className="window_header">
                    <div className="window_header-title">
                        <img src={InitialSuggestionsIcon} alt="" className="window__header-img"/>
                        <h2 className="window__header-text">
                            Add New Question and Answer
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
                        linkedValue={state.newItemValue.question}
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
                        linkedValue={state.newItemValue.answer}
                        onValueChange={handleChange}
                        inputType="textarea"
                        name="answer"
                        className="window__main-field window__main-field--tall"
                        placeholder="Enter Answer"
                    />
                </div>
                
                <div className="window__submit-container">
                    <button className="window__submit-button" onClick={handleAddQuestionAndAnswer}>
                        Add New Question and Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewQuestionsAndAnswers;
