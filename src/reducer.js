import {
  STUDY_MODE,
  ALL_CARDS,
  NEXT_CARD,
  PREV_CARD,
  FLIP_CARD,
  INCREASE_KNOWN_COUNT,
  RESET_CARD_PROGRESS,
  HIDE_MASTERED,
  CHECK_FILTER,
  SHUFFLE_CARDS,
  SHOW_TOAST,
  HIDE_TOAST,
  ADD_CARD,
  OPEN_DELETE_MODAL,
  CLOSE_MODAL,
  OPEN_EDIT_MODAL,
  DELETE_CARD,
  EDIT_CARD,
  TOGGLE_ALL,
} from "./action";

import {
  categories,
  checkMastered,
  collectLikeCards,
  dynamicCards,
  returnFocusOnCardEditOrDelete,
  shuffleCards,
  updateCards,
} from "./utils";

const reducer = (state, action) => {
  // toggle study mode
  if (action.type === STUDY_MODE) {
    return { ...state, isCardStudyMode: true };
  }

  // toggle all cards
  if (action.type === ALL_CARDS) {
    return { ...state, isCardStudyMode: false };
  }

  // prev card
  if (action.type === PREV_CARD) {
    const currCard = state.currCards;
    const count = action.payload;
    const slide = (count - 1 + currCard.length) % currCard.length;

    return { ...state, currentCardIndex: slide, isCardFlipped: false };
  }

  // next card
  if (action.type === NEXT_CARD) {
    const currCard = state.currCards;
    const count = action.payload;
    const slide = (count + 1) % currCard.length;

    return { ...state, currentCardIndex: slide, isCardFlipped: false };
  }

  // flip card
  if (action.type === FLIP_CARD) {
    return { ...state, isCardFlipped: !state.isCardFlipped };
  }

  // increase card progress
  if (action.type === INCREASE_KNOWN_COUNT) {
    const { currentCardIndex, currCards, isHideMastered, cards } = state;
    const knownCount = currCards[currentCardIndex].knownCount + 1;

    if (knownCount > 5) return { ...state };

    currCards[currentCardIndex].knownCount = knownCount;
    const cardID = currCards[currentCardIndex].id;
    state.cards = cards.map((card) => {
      if (card.id === cardID) card.knownCount = knownCount;
      return card;
    });

    if (isHideMastered && knownCount > 4) {
      state.currCards = currCards.filter(
        (card, index) => index !== currentCardIndex,
      );
      state.currentCardIndex =
        currentCardIndex + 1 >= currCards.length ?
          (currentCardIndex + 1) % currCards.length
        : currentCardIndex;
    }

    return {
      ...state,
      isAllMastered: checkMastered(state),
    };
  }

  // reset card progress
  if (action.type === RESET_CARD_PROGRESS) {
    const currSlide = state.currentCardIndex;
    state.currCards[currSlide].knownCount = 0;

    const cardID = state.currCards[currSlide].id;
    state.cards = state.cards.map((card) => {
      if (card.id === cardID) card.knownCount = 0;
      return card;
    });

    return { ...state };
  }

  // hide mastered
  if (action.type === HIDE_MASTERED) {
    const {
      cards,
      isHideMastered,
      filteredCategories,
      isShuffled,
      shuffledCards,
      currentCardIndex,
    } = state;

    const hideMastered = !isHideMastered;

    const { likeCards } = updateCards({
      filteredCategories,
      filter: null,
      cards,
      isHideMastered: hideMastered,
      isShuffled,
      shuffledCards,
    });

    // "currentCardIndex + 1" because it is 0 indexed, but the length of the currCards is 1 indexed.
    const newIndex =
      currentCardIndex >= likeCards.length ? likeCards.length - 1
      : currentCardIndex < 0 ? 0
      : currentCardIndex;

    return {
      ...state,
      currCards: likeCards,
      isHideMastered: hideMastered,
      currentCardIndex: newIndex,
      isCardFlipped: false,
    };
  }

  // checkbox filter
  if (action.type === CHECK_FILTER) {
    const {
      cards,
      isHideMastered,
      filteredCategories,
      isShuffled,
      shuffledCards,
      currentCardIndex,
    } = state;

    const filter = action.payload;

    const { likeCards, newFilteredCategories } = updateCards(
      {
        filteredCategories,
        filter,
        cards,
        isHideMastered,
        isShuffled,
        shuffledCards,
      },
      "categoryFilter",
    );

    const newIndex =
      currentCardIndex >= likeCards.length ? likeCards.length - 1
      : currentCardIndex < 0 ? 0
      : currentCardIndex;

    return {
      ...state,
      currCards: likeCards,
      filteredCategories: newFilteredCategories,
      currentCardIndex: newIndex,
    };
  }

  // shuffle cards
  if (action.type === SHUFFLE_CARDS) {
    const { cards, currCards } = state;

    const newCards = shuffleCards(cards);
    const likeCards = collectLikeCards(newCards, currCards);

    return {
      ...state,
      shuffledCards: newCards,
      isShuffled: true,
      currCards: likeCards,
      isCardFlipped: false,
    };
  }

  // show toast
  if (action.type === SHOW_TOAST) {
    const message = action.payload;
    return { ...state, setToast: true, toastMessage: message };
  }

  // hide toast
  if (action.type === HIDE_TOAST) {
    return { ...state, setToast: false, toastMessage: "" };
  }

  // add card
  if (action.type === ADD_CARD) {
    const {
      cards,
      filteredCategories,
      isShuffled,
      shuffledCards,
      isHideMastered,
    } = state;

    const card = action.payload;
    const category = card.category;
    cards.unshift(card);

    const newCategories = categories(cards).categoriesWithCount;

    const { likeCards, newFilteredCategories } = updateCards(
      {
        filteredCategories,
        filter: category,
        cards,
        isHideMastered,
        isShuffled,
        shuffledCards,
      },
      "addCard",
    );

    return {
      ...state,
      currCards: likeCards,
      categories: newCategories,
      filteredCategories: newFilteredCategories,
    };
  }

  // open delete modal
  if (action.type === OPEN_DELETE_MODAL) {
    const id = action.payload;
    const singleCard = state.cards.find((card) => card.id === id);

    return {
      ...state,
      isDelete: true,
      cardToEdit: { ...singleCard },
    };
  }

  // close modal
  if (action.type === CLOSE_MODAL) {
    const { cardToEdit, isDelete } = state;
    const id = cardToEdit.id;
    const el = document.querySelector(
      `${isDelete ? ".delete-btn" : ".edit-btn"}[data-id="${id}"]`,
    );
    el && el.parentElement.parentElement.focus();

    return { ...state, isDelete: false, isEditting: false, cardToEdit: {} };
  }

  // open edit modal
  if (action.type === OPEN_EDIT_MODAL) {
    const id = action.payload;
    const singleCard = state.cards.find((card) => card.id === id);

    return {
      ...state,
      isEditting: true,
      cardToEdit: { ...singleCard },
    };
  }

  // delete card and edit card will be somewhat similar to add card, where the cards array and filtered categories will be updated based on the current filter and shuffle status, and then based on the updated cards array, return new currCards

  // delete card
  if (action.type === DELETE_CARD) {
    const {
      cards,
      filteredCategories,
      isShuffled,
      shuffledCards,
      isHideMastered,
      currCards,
      currentCardIndex,
    } = state;

    const card = action.payload;
    const id = card.id;
    const category = card.category;
    const newCards = cards.filter((card) => card.id !== id);

    const newCategories = categories(newCards).categoriesWithCount;

    const { likeCards, newFilteredCategories } = updateCards(
      {
        filteredCategories,
        filter: category,
        cards: newCards,
        isHideMastered,
        isShuffled,
        shuffledCards,
      },
      "deleteCard",
    );

    // if the deleted card is the only card in that category, remove that category from the filteredCategories array
    const latestFilteredCategories =
      state.categories[category] === 1 ?
        newFilteredCategories.filter((cat) => cat !== category)
      : [...newFilteredCategories];

    returnFocusOnCardEditOrDelete(true, id);

    // Ensure the currCardIndex is updated if a card is deleted in the all cards section.
    let cardIndex;
    if (cards.length > 1) {
      const deletedCardIndex = currCards.findIndex(
        (currCard) => currCard.id === card.id,
      );

      cardIndex =
        (
          currentCardIndex === deletedCardIndex &&
          deletedCardIndex === currCards.length - 1
        ) ?
          currCards.length - 2
        : (
          currentCardIndex !== deletedCardIndex &&
          currentCardIndex === currCards.length - 1
        ) ?
          currentCardIndex - 1
        : currentCardIndex;
    } else {
      cardIndex = 0;
    }

    return {
      ...state,
      cards: newCards,
      currCards: likeCards,
      categories: newCategories,
      filteredCategories: latestFilteredCategories,
      currentCardIndex: cardIndex,
      isDelete: false,
      cardToEdit: {},
    };
  }

  // edit card
  if (action.type === EDIT_CARD) {
    const {
      cards,
      filteredCategories,
      isShuffled,
      shuffledCards,
      isHideMastered,
      cardToEdit,
    } = state;

    const id = cardToEdit.id;
    const { question, answer, category } = action.payload;
    const newCards = cards.map((item) => {
      if (item.id === id) item = { ...item, question, answer, category };
      return item;
    });

    const newCategories = categories(newCards).categoriesWithCount;

    const { likeCards, newFilteredCategories } = updateCards(
      {
        filteredCategories,
        filter: category,
        cards: newCards,
        isHideMastered,
        isShuffled,
        shuffledCards,
      },
      "addCard",
    );

    // if the category of the edited card changes and if it's the only card in that category
    const latestFilteredCategories =
      (
        state.categories[cardToEdit.category] === 1 &&
        cardToEdit.category !== category
      ) ?
        newFilteredCategories.filter((cat) => cat !== cardToEdit.category)
      : [...newFilteredCategories];

    returnFocusOnCardEditOrDelete(false, id);

    return {
      ...state,
      cards: newCards,
      currCards: likeCards,
      categories: newCategories,
      filteredCategories: latestFilteredCategories,
      isEditting: false,
      cardToEdit: {},
    };
  }

  // toggle all categories
  if (action.type === TOGGLE_ALL) {
    const {
      categories,
      filteredCategories,
      cards,
      isHideMastered,
      isShuffled,
      shuffledCards,
    } = state;

    const id = !action.payload;
    const categoryFilters =
      id === true ? Object.keys(categories) : [...filteredCategories];

    const { likeCards, newFilteredCategories } = updateCards({
      filteredCategories: categoryFilters,
      cards,
      isHideMastered,
      isShuffled,
      shuffledCards,
    });

    return {
      ...state,
      currCards: likeCards,
      filteredCategories: newFilteredCategories,
    };
  }

  // error handler
  throw new Error(`no matching action type : ${action.type}`);
};

export default reducer;
