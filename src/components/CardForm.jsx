import { FormControl, ErrorElement } from "./index";
import createCardIcon from "../assets/images/icon-circle-plus.svg";
import { useState } from "react";
import { useGlobalContext } from "../context";

const CardForm = ({ formProps }) => {
  const { question, answer, category, toastMessage, btnText, isModalForm } =
    formProps;

  const { showToast, addCard, editCard } = useGlobalContext();

  const [card, setCard] = useState({ question, answer, category });
  const [errorBound, setErrorBound] = useState([]);

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
    if (!e.target.value) {
      e.target.parentElement.classList.add("show");
    } else e.target.parentElement.classList.remove("show");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorArr = [];

    const { question, answer, category } = card;
    const formInputs = [...e.currentTarget];

    formInputs.forEach((input, index) => {
      const parentElement = input.parentElement;
      const checkParent = parentElement.classList.contains("form-row");
      if (checkParent && (!input.value || !input.value.trim())) {
        parentElement.classList.add("show");
        errorArr.push(input);
      }
    });

    if (!question.trim() || !answer.trim() || !category.trim()) {
      errorArr[0].focus();
      showToast("Please fill in all fields.");
      setErrorBound([...errorArr.map((input) => input.name)]);
      return;
    }

    if (question && answer && category) {
      const newQuestion = question.charAt(0).toUpperCase() + question.slice(1);
      const newAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);

      if (isModalForm === false) {
        const formCard = {
          id: Date.now(),
          question: newQuestion,
          answer: newAnswer,
          category,
          knownCount: 0,
        };
        addCard(formCard);
      } else {
        const formCard = {
          question: newQuestion,
          answer: newAnswer,
          category,
        };
        editCard(formCard);
      }

      setCard({ question: "", answer: "", category: "" });
      showToast(toastMessage);
    }
  };

  return (
    <form className="card-form form" onSubmit={handleSubmit}>
      <FormControl
        label="question"
        value={card.question}
        handleChange={handleChange}
        placeholderText="e.g, What is the capital of France..."
        errorText="a question"
        errorID="error-que"
        errorCheck={errorBound.includes("question") ? true : false}
      />
      <div className="form-row">
        <label htmlFor="answer" className="form-label" aria-hidden="true">
          answer
        </label>
        <textarea
          name="answer"
          id="answer"
          value={card.answer}
          onChange={handleChange}
          placeholder="e.g, Paris"
          aria-label="answer input field."
          aria-required="true"
          aria-invalid={errorBound.includes("answer") ? true : false}
          aria-describedby={
            errorBound.includes("answer") ? "error-ans" : undefined
          }
        ></textarea>
        <ErrorElement errorText="an answer" errorID="error-ans" />
      </div>
      <FormControl
        label="category"
        value={card.category}
        handleChange={handleChange}
        placeholderText="e.g, Geography"
        errorText="a category"
        errorID="error-cat"
        errorCheck={errorBound.includes("category") ? true : false}
      />
      <button type="submit" className="btn btn-yellow card-btn">
        {isModalForm ? null : (
          <img src={createCardIcon} alt="create card icon" aria-hidden="true" />
        )}
        <span>{btnText}</span>
      </button>
    </form>
  );
};
export default CardForm;
