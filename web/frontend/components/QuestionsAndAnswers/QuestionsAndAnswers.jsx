import React, { useEffect, useState } from "react";
import "./QuestionsAndAnswers.css";
import AddNewQuestionsAndAnswers from "./AddNewQuestionsAndAnswers";
import EditQuestionAndAnswer from "./EditQuestionAndanswer";

const QuestionsAndAnswers = ({ updateData, FAQs }) => {
  const [isModalWindow, setIsModalWindow] = useState(false);
  const [state, setState] = useState({
    FAQs: FAQs,
  });

  const [itemIndex, setItemIndex] = useState(0);
  const [modalWindowNameToOpen, setModalWindowToOpen] =
    useState("AddNewSuggestion");

  useEffect(() => {
    updateData("FAQs", state.FAQs);
  }, [state.FAQs]);

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

  const handleDelete = (itemIndex) => {
    const newQuestionsAndAnswers = FAQs.filter(
      (prevState, index) => index !== itemIndex
    );
    handleChange("FAQs", newQuestionsAndAnswers);
  };

  const handleOpenModelWindow = (windowName, itemIndex) => {
    setIsModalWindow(true);
    setItemIndex(itemIndex);
    setModalWindowToOpen(windowName);
  };

  return (
    <>
      {isModalWindow &&
        modalWindowNameToOpen === "AddNewQuestionsAndAnswers" && (
          <AddNewQuestionsAndAnswers
            setIsModalwindow={setIsModalWindow}
            questionsAndAnswersList={FAQs}
            setChange={handleChange}
          />
        )}
      {isModalWindow && modalWindowNameToOpen === "EditQuestionAndanswer" && (
        <EditQuestionAndAnswer
          setIsModalwindow={setIsModalWindow}
          itemIndex={itemIndex}
          questionsAndAnswersList={FAQs}
          setChange={handleChange}
        />
      )}
      <div className="block-container" style={{ padding: "0", gap: "0" }}>
        <div className="block-container__title block-container__title--combined">
          <div className="title-main">
            <img
              src="../../assets/Icons/InitialSuggestionsIcon.png"
              alt=""
              className="block-container__title-img"
            />
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
            {FAQs.map((element, index) => {
              return (
                <li
                  key={index}
                  className="block-container__main-item block-container__main-item--tall"
                >
                  <div className="block-container__main-item-header">
                    <div className="block-container__main-item-suggestion">
                      <strong>{element.question}</strong>
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
                          handleDelete(index);
                        }}
                        className="block-container__main-item-edit-button block-container__main-item-edit-button--right"
                      >
                        <img src="../../assets/svgs/Bin.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="block-container__main-item-main">
                    <p>{element.answer}</p>
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

export default QuestionsAndAnswers;
