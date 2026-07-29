import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import data from "../data.json";
import reducer from "./reducer";
import {
  ADD_CARD,
  ALL_CARDS,
  CHECK_FILTER,
  CLOSE_MODAL,
  DELETE_CARD,
  EDIT_CARD,
  FLIP_CARD,
  HIDE_MASTERED,
  HIDE_TOAST,
  INCREASE_KNOWN_COUNT,
  NEXT_CARD,
  OPEN_DELETE_MODAL,
  OPEN_EDIT_MODAL,
  PREV_CARD,
  RESET_CARD_PROGRESS,
  SHOW_TOAST,
  SHUFFLE_CARDS,
  STUDY_MODE,
  TOGGLE_ALL,
} from "./action";

import { categories } from "./utils";
import Toast from "./components/Toast";

const AppContext = createContext();

// default state for the app, including cards, categories, and various flags for UI state
const defaultCards = {
  isCardStudyMode: true,
  cards: [...data.flashcards],
  currCards: [...data.flashcards],
  get categories() {
    return categories(this.cards).categoriesWithCount;
  },
  get filteredCategories() {
    return categories(this.cards).categoriesArr;
  },
  isAllMastered: false,
  currentCardIndex: 0,
  isCardFlipped: false,
  isHideMastered: false,
  isShuffled: false,
  toastMessage: "",
  setToast: false,
  cardToEdit: {},
  isEditting: false,
  isDelete: false,
};

const getCardsFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("cards")) || defaultCards;

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getCardsFromLocalStorage());

  const toggleStudyMode = () => {
    dispatch({ type: STUDY_MODE });
  };

  const toggleAllCards = () => {
    dispatch({ type: ALL_CARDS });
  };
  const nextCard = (count) => {
    dispatch({ type: NEXT_CARD, payload: count });
  };
  const prevCard = (count) => {
    dispatch({ type: PREV_CARD, payload: count });
  };
  const flipCard = () => {
    dispatch({ type: FLIP_CARD });
  };
  const increaseKnownCount = () => {
    dispatch({ type: INCREASE_KNOWN_COUNT });
  };
  const resetCardProgress = () => {
    dispatch({ type: RESET_CARD_PROGRESS });
  };
  const hideMastered = () => {
    dispatch({ type: HIDE_MASTERED });
  };
  const checkboxFilter = (category) => {
    dispatch({ type: CHECK_FILTER, payload: category });
  };
  const shuffleCards = () => {
    dispatch({ type: SHUFFLE_CARDS });
  };
  const showToast = (text) => {
    dispatch({ type: SHOW_TOAST, payload: text });
    setTimeout(() => hideToast(), 2000);
  };
  const hideToast = () => {
    dispatch({ type: HIDE_TOAST });
  };
  const addCard = (card) => {
    dispatch({ type: ADD_CARD, payload: card });
  };
  const openDeleteModal = (id) => {
    dispatch({ type: OPEN_DELETE_MODAL, payload: id });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  const deleteCard = (card) => {
    dispatch({ type: DELETE_CARD, payload: card });
  };
  const openEditModal = (id) => {
    dispatch({ type: OPEN_EDIT_MODAL, payload: id });
  };
  const editCard = (card) => {
    dispatch({ type: EDIT_CARD, payload: card });
  };
  const toggleAllCategories = (id) => {
    dispatch({ type: TOGGLE_ALL, payload: id });
  };

  useEffect(() => {
    const { cards } = state;
    const mastered = cards.every((card) => card.knownCount === 5);

    mastered ? (state.isAllMastered = true) : (state.isAllMastered = false);

    localStorage.setItem("cards", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleStudyMode,
        toggleAllCards,
        nextCard,
        prevCard,
        flipCard,
        increaseKnownCount,
        resetCardProgress,
        hideMastered,
        checkboxFilter,
        shuffleCards,
        showToast,
        hideToast,
        addCard,
        openDeleteModal,
        deleteCard,
        closeModal,
        openEditModal,
        editCard,
        toggleAllCategories,
      }}
    >
      {children}
      {state.setToast && (
        <Toast message={state.toastMessage} removeToast={hideToast} />
      )}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
