import { useGlobalContext } from "../context";
import {
  EmptyCards,
  Flashcard,
  ButtonWithIcon,
  FlashcardFooter,
  SrAnnouncement,
} from "./index";
import circleCheckIcon from "../assets/images/icon-circle-check.svg";
import resetIcon from "../assets/images/icon-reset.svg";
import { useState } from "react";
import { sortCards } from "../utils";

const FlashcardBody = () => {
  const [annoucement, setAnnoucement] = useState("");

  const {
    cards,
    currCards,
    isAllMastered,
    isHideMastered,
    currentCardIndex,
    flipCard,
    isCardFlipped,
    filteredCategories,
    isShuffled,
  } = useGlobalContext();

  // Check if there are no cards
  if (cards.length < 1) {
    return (
      <EmptyCards
        text="No cards to study."
        desc="You don’t have any cards yet. Add your first card in the “All Cards” tab."
        mastered={false}
      />
    );
  }

  // check if all cards are mastered and hide mastered is on
  if (isAllMastered && isHideMastered) {
    return (
      <EmptyCards
        text="You’re all caught up!"
        desc="All your cards are mastered. Turn off “Hide mastered” to see them again or create new cards in the “All Cards” tab."
        mastered={true}
      />
    );
  }

  // Check if no categories are selected
  if (filteredCategories.length < 1) {
    return (
      <EmptyCards
        text="No category selected."
        desc="Please select at least one category to view a card"
        mastered={true}
      />
    );
  }

  const newCards = isShuffled ? [...currCards] : sortCards(currCards);

  const handleAnnoucement = (message) => {
    setAnnoucement(message);
  };

  return (
    <div>
      <SrAnnouncement announcement={annoucement} />

      <div>
        <div
          className="flashcards"
          role="region"
          aria-label="Flashcard study."
          tabIndex={0}
        >
          {newCards.map((card, cardIndex) => {
            const { id, question, answer, category, knownCount } = card;

            return (
              <div
                className="flashcard-container"
                key={id}
                style={{
                  transform: `translateX(${100 * (cardIndex - currentCardIndex)}%)`,
                }}
                aria-hidden={currentCardIndex === cardIndex ? false : true}
              >
                <div
                  className={`flashcard-content ${isCardFlipped ? "flip" : ""}`}
                  aria-live="polite"
                  aria-atomic="true"
                  onClick={() => flipCard()}
                >
                  <div
                    className="flashcard front-card"
                    aria-hidden={isCardFlipped ? true : false}
                    aria-label="Click to reveal answer."
                    onClick={() => setAnnoucement("Card flipped to answer!")}
                  >
                    <Flashcard {...card} type="question" />
                  </div>

                  <div
                    className="flashcard back-card"
                    aria-hidden={isCardFlipped ? false : true}
                    aria-label="Click to reveal question."
                    onClick={() => setAnnoucement("Card flipped to question!")}
                  >
                    <Flashcard {...card} type="answer" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flashcard-btn-container">
          <ButtonWithIcon
            classes="btn btn-yellow"
            icon={circleCheckIcon}
            altText="circle check icon"
            btnText="i know this"
            id="know"
          />
          <ButtonWithIcon
            classes="btn btn-neutral"
            icon={resetIcon}
            altText="reset icon"
            btnText="reset progress"
            id="reset"
          />
        </div>

        <FlashcardFooter />
      </div>
    </div>
  );
};

export default FlashcardBody;
