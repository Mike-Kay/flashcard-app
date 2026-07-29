import { useState } from "react";
import { useGlobalContext } from "../context";
import SrAnnouncement from "./SrAnnouncement";

const ButtonWithIcon = ({ classes, icon, altText, btnText, id }) => {
  const [announcement, setAnnouncement] = useState("");
  let message;

  const {
    currCards,
    currentCardIndex,
    nextCard,
    prevCard,
    increaseKnownCount,
    resetCardProgress,
  } = useGlobalContext();

  const nextCount = (currentCardIndex + 1) % currCards.length;
  const prevCount =
    (currentCardIndex - 1 + currCards.length) % currCards.length;
  const mastered = currCards[currentCardIndex].knownCount > 4;

  const handleClick = () => {
    if (id === "prev") {
      message = `You moved to the previous card. This is card ${prevCount + 1} of ${currCards.length}.`;
      prevCard(currentCardIndex);
    }
    if (id === "next") {
      message = `You moved to the next card. This is card ${nextCount + 1} of ${currCards.length}.`;
      nextCard(currentCardIndex);
    }
    if (id === "know") {
      increaseKnownCount();
      currCards[currentCardIndex].knownCount === 4 ?
        (message =
          "Card progress has increased, you have now mastered this card. You can reset your progress to study it again.")
      : (message = "Card progress has increased.");
    }
    if (id === "reset") {
      resetCardProgress();
      message = "Card progress has reset.";
    }
  };

  return (
    <>
      <button
        type="button"
        className={classes}
        id={id}
        onClick={() => {
          handleClick();
          setAnnouncement(message);
          setTimeout(() => setAnnouncement(""), 500);
        }}
        disabled={id === "know" && mastered ? true : false}
        aria-label={btnText}
      >
        <img src={icon} alt={altText} aria-hidden={true} />
        <span>{id === "know" && mastered ? "already mastered" : btnText}</span>
      </button>
      <SrAnnouncement announcement={announcement} />
    </>
  );
};
export default ButtonWithIcon;
