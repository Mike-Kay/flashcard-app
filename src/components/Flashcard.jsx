import { CardProgress } from "./index";
import bluePatternIcon from "../assets/images/pattern-star-blue.svg";
import pinkPatternIcon from "../assets/images/pattern-star-pink.svg";
import yellowPatternIcon from "../assets/images/pattern-star-yellow.svg";

const FlashCard = ({ category, question, answer, type, knownCount }) => {
  return (
    <>
      <div
        className="category-tag"
        aria-label={`Card category is: ${category}.`}
      >
        <span aria-hidden="true">{category}</span>
      </div>
      {type === "question" ?
        <div
          aria-label={`Card question is: ${question}. Click to reveal answer.`}
        >
          <h1 aria-hidden="true">{question}</h1>
          <p aria-hidden="true">Click to reveal answer</p>
        </div>
      : <div aria-label={`Card answer is: ${answer}.`}>
          <p aria-hidden="true">Answer:</p>
          <h1 aria-hidden="true">{answer}</h1>
        </div>
      }
      <CardProgress knownCount={knownCount} />
      <img
        src={yellowPatternIcon}
        alt="pattern icon"
        className="flashcard-icon"
        aria-hidden={true}
      />
      <img
        src={type === "question" ? bluePatternIcon : pinkPatternIcon}
        alt="pattern icon"
        className="flashcard-icon"
        aria-hidden={true}
      />
    </>
  );
};
export default FlashCard;
