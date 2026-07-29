import { useEffect, useRef } from "react";

export const checkMastered = (cardsState) => {
  const { cards } = cardsState;
  return cards.every((obj) => obj.knownCount === 5);
};

// get unique categories and accumulate the count of each category i.e the number of times each card category appears in the flashcards
export const categories = (items) => {
  const categoriesWithCount = items?.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categoriesArr = Object.keys(categoriesWithCount);

  return { categoriesWithCount, categoriesArr };
};

export const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export const dynamicCards = ({ cards, isHideMastered, filteredCategories }) => {
  const filteredCards = [];

  filteredCategories.forEach((category) => {
    cards.filter(
      (card) => card.category === category && filteredCards.push(card),
    );
  });

  const currCards =
    isHideMastered ?
      filteredCards.filter((card) => card.knownCount < 5)
    : filteredCards;

  return currCards;
};

export const collectLikeCards = (firstArr, secArr) => {
  return firstArr.filter((firstArrItem) =>
    secArr.some((secArrItem) => secArrItem.id === firstArrItem.id),
  );
};

export const updateCards = (
  {
    filteredCategories,
    filter,
    cards,
    isHideMastered,
    isShuffled,
    shuffledCards,
  },
  type,
) => {
  // check if the filter(i.e, the category) is already included in the filteredCategories array
  const isIncluded = filteredCategories.includes(filter);

  let newFilteredCategories;
  // When filtering cards from the category dropdown or adding a card and editing a card
  if (type === "categoryFilter") {
    newFilteredCategories =
      isIncluded ?
        [...filteredCategories].filter((category) => category !== filter)
      : [filter, ...filteredCategories];
  } else if (type === "addCard") {
    newFilteredCategories =
      isIncluded ? [...filteredCategories] : [filter, ...filteredCategories];
  } else {
    newFilteredCategories = [...filteredCategories];
  }

  const newCards = dynamicCards({
    cards,
    isHideMastered,
    filteredCategories: newFilteredCategories,
  });

  // check if shuffle is active
  const likeCards =
    isShuffled ? collectLikeCards(shuffledCards, newCards) : [...newCards];

  return { likeCards, newFilteredCategories };
};

export const sortCards = (cards) => {
  return cards.sort((a, b) => a.category.localeCompare(b.category));
};

export const returnFocusOnCardEditOrDelete = (isDelete, id) => {
  const el = document.querySelector(
    `${isDelete ? ".delete-btn" : ".edit-btn"}[data-id="${id}"]`,
  );
  const prevSibling = el?.parentElement.parentElement.previousElementSibling;
  const nextSibling = el?.parentElement.parentElement.nextElementSibling;

  if (isDelete) {
    nextSibling ? nextSibling?.focus() : prevSibling?.focus();

    return;
  }

  el && el.parentElement.parentElement.parentElement.focus();
};

export const useFocusTrap = ({
  isOpen,
  isEditting,
  isDelete,
  isDropdown,
  isCardDropdown,
  closeModal,
  id,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;

    // Select all typical focusable elements
    let focusableSelector;
    if (isEditting) focusableSelector = ".edit-dialog, .btn, input, textarea";
    if (isDelete) focusableSelector = "div, .btn.btn-cancel, .btn.btn-yellow";
    if (isDropdown) focusableSelector = "input";
    if (isCardDropdown) focusableSelector = ".edit-btn, .delete-btn";

    const focusableElements = container.querySelectorAll(focusableSelector);

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // 1. Instantly focus the first element on mount
    if (firstElement) firstElement.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isDropdown) {
        e.preventDefault();
        closeModal();
        returnFocusOnCardEditOrDelete(false, id);
      }

      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab: if on the first element, wrap around to the last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on the last element, wrap around to the first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return containerRef;
};
