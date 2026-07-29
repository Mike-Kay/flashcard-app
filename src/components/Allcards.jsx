import { useGlobalContext } from "../context";
import { FlashcardHeader, EmptyCards, SrAnnouncement } from "./index";
import { sortCards } from "../utils";
import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const Allcards = () => {
  const {
    currCards,
    isShuffled,
    isHideMastered,
    isAllMastered,
    isEditting,
    isDelete,
  } = useGlobalContext();

  const [numOfCards, setNumOfCards] = useState(12);
  const [loadMore, setLoadMore] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleLoadCards = () => {
    setNumOfCards(numOfCards + 12);
    setLoadMore(true);
    setAnnouncement("More flashcards has been loaded successfully!");
    setTimeout(() => setAnnouncement(""), 500);
  };

  // focus on the first card of the newly loaded cards
  useEffect(() => {
    [...document.querySelectorAll(".single-card")].forEach((card, index) => {
      if (index === numOfCards - 12 && loadMore) card.focus();
    });
  }, [numOfCards, loadMore]);

  const checkNumOfCards = numOfCards >= currCards.length;
  const newCards = isShuffled ? [...currCards] : sortCards(currCards);

  return (
    <article className="all-cards">
      <FlashcardHeader />
      {isHideMastered && isAllMastered ?
        <EmptyCards
          text="You’re all caught up!"
          desc="All your cards are mastered. Turn off “Hide mastered” to see them again or create new cards."
          mastered={true}
        />
      : <div
          className="all-cards-container"
          role="region"
          aria-label="All flash cards."
        >
          {newCards.slice(0, numOfCards).map((card, index) => {
            return <SingleCard key={card.id} {...card} index={index} />;
          })}
        </div>
      }
      {!checkNumOfCards && (
        <button
          type="button"
          className="btn load-btn btn-neutral"
          aria-label="Load more flashcards."
          onClick={handleLoadCards}
        >
          load more
        </button>
      )}

      <SrAnnouncement announcement={announcement} />
    </article>
  );
};
export default Allcards;
