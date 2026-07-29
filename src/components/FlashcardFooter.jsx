import ButtonWithIcon from "./ButtonWithIcon";
import prevIcon from "../assets/images/icon-chevron-left.svg";
import nextIcon from "../assets/images/icon-chevron-right.svg";
import { useGlobalContext } from "../context";

const FlashcardFooter = () => {
  const { currentCardIndex, currCards } = useGlobalContext();

  return (
    <div className="flashcard-footer">
      <ButtonWithIcon
        classes="btn prev-btn"
        icon={prevIcon}
        altText="previous button icon"
        btnText="previous"
        id="prev"
      />
      <span>
        card {currentCardIndex + 1} of {currCards.length}
      </span>
      <ButtonWithIcon
        classes="btn next-btn"
        icon={nextIcon}
        altText="next button icon"
        btnText="next"
        id="next"
      />
    </div>
  );
};
export default FlashcardFooter;
